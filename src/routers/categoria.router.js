const express = require("express");
const router = express.Router();
const categoriaController = require("../controller/categoria.controller");
const categotiaValidation = require("./validation/categoria.validation");

router.get("/", categoriaController.get);
router.post("/", categotiaValidation, categoriaController.post);

module.exports = router;
