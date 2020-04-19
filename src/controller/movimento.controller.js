const createMovimentoService = require("../service/create.movimento.service");
const { validationResult } = require("express-validator");

const createMovimentoController = () => {
  const _movimentoService = createMovimentoService();

  const _movimentosDoDia = (req, res) => {
    _movimentoService
      .movimentosDoDia()
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(400);
        res.send({ erro: err });
      });
  };

  const _post = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } else {
      _movimentoService
        .save(req.body)
        .then((data) => {
          res.status(201);
          res.send({ message: "Recurso criado com sucesso!", movimento: data });
        })
        .catch((err) => {
          res.status(412);
          res.send({ erro: err.detail });
        });
    }
  };

  return {
    movimentosDoDia: _movimentosDoDia,
    post: _post
  };
};

module.exports = createMovimentoController;
