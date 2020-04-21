const createMovimentoService = require("../service/create.movimento.service");
const { validationResult } = require("express-validator");
const tratarRespostas = require("./respostas");

const createMovimentoController = () => {
  const _movimentoService = createMovimentoService();

  const _movimentosDoDia = (req, res) => {
    const idEmpresa = req.params.idEmpresa;
    _movimentoService.movimentosDoDia(idEmpresa)
      .then((data) => {
        tratarRespostas.resposta200(res, data);        
      })
      .catch((error) => {
        tratarRespostas.resposta400(res, error);
      });
  };

  const _post = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      tratarRespostas.resposta422(res, errors);
    } else {
      _movimentoService.save(req.body)
        .then((data) => {
          tratarRespostas.resposta201(res, data);
        })
        .catch((error) => {
          tratarRespostas.resposta412(res, error);
        });
    }
  };

  return {
    movimentosDoDia: _movimentosDoDia,
    post: _post
  };
};

module.exports = createMovimentoController;
