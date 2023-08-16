//sets up a connection to a MySQL database using the mysql module
const mysql = require("mysql");
const dbConfig = require("./db.config");

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
});

connection.connect((error) => {
    if (error) throw error;
    {
        console.log("Successfully connected to DB");
    }
});

module.exports = connection;
