//create a basic web server that serves static files and handles CRUD 
//(Create, Read, Update, Delete) operations related to a database.
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const crud = require("./db/db.crud");

const port = 3000;

app.use(express.static(path.join(__dirname, "Static")));
app.set("Views", path.join(__dirname, "Views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Views/index.html"));
});

app.get("/add-product", (req, res) => {
    res.sendFile(path.join(__dirname, "Views/add-product.html"));
});

app.get("/initDb", crud.initDb);
app.get("/getProducts", crud.getProducts);
app.get("/searchProducts", crud.searchProducts);
app.post("/addProduct", crud.addProduct);

app.listen(port, () => {
    console.log("server is running on port: " + port);
});
