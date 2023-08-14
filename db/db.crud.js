const connection = require("./db");
const path = require("path");
const csv = require("csvtojson");

const initDb = (req, res) => {
    const sql = `DROP DATABASE IF EXISTS orel`;
    connection.query(sql, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(500).send({ err });
        }
        console.log("db dropped successfully");

        const sql = `CREATE DATABASE IF NOT EXISTS orel`;
        connection.query(sql, (err, mysqlres) => {
            if (err) {
                console.log(err);
                res.status(500).send({ err });
            }
            console.log("db created successfully");

            const sql = `CREATE TABLE IF NOT EXISTS orel.products(
                id INT NOT NULL AUTO_INCREMENT,
                title VARCHAR(50) NOT NULL,
                description VARCHAR(250) NOT NULL,
                image VARCHAR(1000) NOT NULL,
                price DOUBLE NOT NULL,
                PRIMARY KEY (id)
            )`;
            connection.query(sql, (err, mysqlres) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ err });
                }
                console.log("table products created successfully");

                return insertProducts(req, res);
            });
        });
    });
};

const insertProducts = (req, res) => {
    let sql = `INSERT INTO orel.products SET ?`;
    const csvFilePath = path.join(__dirname, "products.csv");
    csv()
        .fromFile(csvFilePath)
        .then((obj) => {
            obj.forEach((row) => {
                var product = {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    image: row.image,
                    price: row.price,
                };
                connection.query(sql, product, (err, mysqlres) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ err });
                    }
                    console.log(
                        `product: ${product.title} created vsuccessfully`
                    );
                });
            });

            console.log("All products created successfully");
            res.status(200).send({ msg: "db inited successfully" });
        });
};

const getProducts = function (req, res) {
    const sql = `SELECT * FROM orel.products`;
    connection.query(sql, (err, data, mysqlre) => {
        if (err) {
            console.log(err);
            res.status(500).send({ err });
        }
        res.status(200).json(data);
    });
};

const searchProducts = function (req, res) {
    const sql = `SELECT * FROM orel.products WHERE title LIKE '%${req.query.q}%'`;
    connection.query(sql, (err, data, mysqlre) => {
        if (err) {
            console.log(err);
            res.status(500).send({ err });
        }
        res.status(200).json(data);
    });
};

module.exports = {
    initDb,
    getProducts,
    searchProducts,
};
