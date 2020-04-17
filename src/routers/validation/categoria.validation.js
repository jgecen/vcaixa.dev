const { checkSchema } = require("express-validator");

module.exports = checkSchema({
  nome: {
    notEmpty: true,
    errorMessage: "Campo obrigatório"
  }
});
