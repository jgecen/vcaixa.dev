const express = require("express");
const router = express.Router();
const factorRepository = require("../repository/factory.repository");
const createController = require("../controller/default.controller");

const repository = factorRepository.createRepositoryCategoria();
const categoriaController = createController(repository);

const categoriaValidation = require("./validation/categoria.validation");
const { checkSchema } = require("express-validator");

router.get("/", categoriaController.getAll);
router.get("/:id", categoriaController.get);
router.delete("/:id", categoriaController.del);

router.post("/", categoriaValidation, categoriaController.post);
router.put(
  "/",
  checkSchema({
    id: {
      notEmpty: true,
      errorMessage: "Campo obrigatório"
    }
  }),
  categoriaController.put
);

module.exports = router;
