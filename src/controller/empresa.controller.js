const { validationResult } = require("express-validator");
const createEmpresaSerice = require("../service/create.empresa.service");
const tratarRespostas = require("./respostas");

const createEmpresaController = () => {
  let _empresaService = createEmpresaSerice();

  const _post = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      tratarRespostas.resposta422(res, errors);
    } else {
      _empresaService
        .save(req.params.urn, req.body)
        .then((data) => {
          tratarRespostas.resposta201(res, data);
        })
        .catch((error) => {
          tratarRespostas.resposta412(res, error);
        });
    }
  };

  return {
    post: _post
  };
};

module.exports = createEmpresaController;
