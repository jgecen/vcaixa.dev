const bodyParser = require("body-parser");
const express = require("express");

const categoriaRouter = require("./routers/categoria.router");
const movimentoRouter = require("./routers/movimento.router");
const empresaRouter = require("./routers/empresa.router");

const app = express();

app.use(bodyParser.json());

app.use("/categorias", categoriaRouter);

app.use("/movimentos", movimentoRouter);

app.use("/empresas", empresaRouter);

app.get("/", (req, res) => res.send("API v.caixa"));

module.exports = app;
