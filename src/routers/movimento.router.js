const express = require("express");
const movimentoController = require("../controller/movimento.controller")();

const router = express.Router();

router.get("/resumo", movimentoController.movimentosDoDia);
router.post("/", movimentoController.post);

module.exports = router;
