const express = require("express");
const empresaController = require("../controller/empresa.controller")();

const router = express.Router();

router.post("/:urnDev", empresaController.post);

module.exports = router;
