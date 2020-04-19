const { validationResult } = require("express-validator");

const createDefaultController = (repository) => {
  let _repository = repository;

  const _getAll = (req, res) => {
    _repository
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

  const _get = (req, res) => {
    _repository
      .get(req.params.id)
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(400);
        res.send({ erro: err });
      });
  };
  const _del = (req, res) => {
    _repository
      .del(req.params.id)
      .then((data) => {
        res.status(200);
        res.send({ message: "Recurso excluido com sucesso!", recurso: data });
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
      _repository
        .save(req.body)
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

  const _put = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422);
      res.json({ errors: errors.array() });
    } else {
      _repository
        .update(req.body)
        .then((data) => {
          res.status(200);
          res.send({
            message: "Recurso alterado com sucesso!",
            recurso: data
          });
        })
        .catch((err) => {
          res.status(412);
          res.send({ erro: err.detail });
        });
    }
  };

  return {
    getAll: _getAll,
    post: _post,
    put: _put,
    get: _get,
    del: _del
  };
};

module.exports = createDefaultController;
