const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const crud = require("./db/db.crud");

const port = 3000;

app.use(express.static(path.join(__dirname, "static")));
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/add-product", (req, res) => {
    res.sendFile(path.join(__dirname, "views/add-product.html"));
});

app.get("/initDb", crud.initDb);
app.get("/getProducts", crud.getProducts);
app.get("/searchProducts", crud.searchProducts);
app.post("/addProduct", crud.addProduct);

app.listen(port, () => {
    console.log("server is running on port: " + port);
});
