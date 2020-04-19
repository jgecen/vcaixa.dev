const { validationResult } = require("express-validator");
const createEmpresaSerice = require("../service/create.empresa.service");
const createDefaultController = () => {
  let _empresaService = createEmpresaSerice();

  const _post = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      _empresaService
        .save(req.params.urn, req.body)
        .then((data) => {
          res.status(201);
          res.send({ message: "Recurso criado com sucesso!", recurso: data });
        })
        .catch((err) => {
          res.status(412);
          res.send({ erro: err.detail });
        });
    }
  };

  return {
    post: _post
  };
};

module.exports = createDefaultController;
