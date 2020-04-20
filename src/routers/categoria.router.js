const express = require("express");
const router = express.Router();
const createCategoriaController = require("../controller/categoria.controller");
const categoriaValidation = require("./validation/categoria.validation");
const { checkSchema } = require("express-validator");
const categoriaController = createCategoriaController();
const createDevMiddleware = require("../middleware/create.dev.middleware");
const devMiddleware = createDevMiddleware();

router.use("/:urnDev/:idEmpresa", devMiddleware.devContemEmpresa);

router.get("/:urnDev/:idEmpresa", categoriaController.getAll);
router.get("/:urnDev/:idEmpresa/:id", categoriaController.get);
router.delete("/:urnDev/:idEmpresa/:id", categoriaController.del);

router.post("/:urnDev/:idEmpresa", categoriaValidation, categoriaController.post);
router.put(
  "/:urnDev/:idEmpresa",
  checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Campo obrigatório"
    }
  }),
  categoriaController.put
);

module.exports = router;
