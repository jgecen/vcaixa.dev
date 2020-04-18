const express = require("express");
const router = express.Router();
const categoriaController = require("../controller/categoria.controller")();
const categotiaValidation = require("./validation/categoria.validation");
const { checkSchema } = require("express-validator");

router.get("/", categoriaController.get);
router.post("/", categotiaValidation, categoriaController.post);
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
