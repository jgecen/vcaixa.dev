const { validationResult } = require("express-validator");
const factory = require("../../src/repository/factory.repository");

const createCategoriaController = () => {
  const _categoriaRepository = factory.createRepositoryCategoria();

  const _get = (req, res) => {
    _categoriaRepository
      .getAll()
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
      _categoriaRepository
        .save(req.body)
        .then((data) => {
          res.type("json");
          res.status(201);
          res.send({ message: "Recurso criado com sucesso!", categoria: data });
        })
        .catch((err) => {
          res.status(412);
          res.send({ erro: err.detail });
        });
    }
  };
  return {
    get: _get,
    post: _post
  };
};

module.exports = createCategoriaController;
