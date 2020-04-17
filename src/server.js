const bodyParser = require("body-parser");
const express = require("express");

const categoriaRouter = require("./routers/categoria.router");

const app = express();

app.use(bodyParser.json());

app.use("/categorias", categoriaRouter);

app.get("/", (req, res) => res.send("API v.caixa"));

module.exports = app;
