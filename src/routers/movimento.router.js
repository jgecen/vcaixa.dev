const express = require("express");
const movimentoController = require("../controller/movimento.controller")();
const router = express.Router();
const createDevMiddleware = require("../middleware/create.dev.middleware");
const devMiddleware = createDevMiddleware();

router.use("/:urnDev/:idEmpresa", devMiddleware.devContemEmpresa);

router.get("/:urnDev/:idEmpresa/resumo", movimentoController.movimentosDoDia);
router.post("/:urnDev/:idEmpresa", movimentoController.post);

module.exports = router;
