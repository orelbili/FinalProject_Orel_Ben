// defines a Node.js module that handles interactions with a database, 
//specifically related to managing products.
const connection = require("./db");
const path = require("path");
const csv = require("csvtojson");

//initializes the database by performing
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

// reads data from a CSV file named "products.csv
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

// retrieves all products from the "products" table using a SQL
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

// retrieves products from the "products" table based on a search query
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

//exports the defined functions initDb, getProducts, and searchProducts, making them accessible 
//to other parts of the application that require this module.
module.exports = {
    initDb,
    getProducts,
    searchProducts,
};
