const { validationResult } = require("express-validator");
const factoryRepo = require("../../src/repository/factory.repository");
const tratarRespostas = require("./respostas");
const createCategoriaDefaultController = () => {
  const _repository = factoryRepo.createRepositoryCategoria();

  const _getAll = (req, res) => {
    _repository
      .getAll(req.params.idEmpresa)
      .then((data) => {
        tratarRespostas.resposta200(res, data);
      })
      .catch((error) => {
        tratarRespostas.resposta400(res, error);
      });
  };

  const _get = (req, res) => {
    _repository
      .get(req.params.id)
      .then((data) => {
        tratarRespostas.resposta200(res, data);
      })
      .catch((error) => {
        tratarRespostas.resposta400(res, erro);
      });
  };

  const _del = (req, res) => {
    _repository
      .del(req.params.id)
      .then((data) => {
        tratarRespostas.respostaExclusao200(res, data);
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
      _repository
        .save(req.body)
        .then((data) => {
          tratarRespostas.resposta201(res, data);
        })
        .catch((error) => {
          tratarRespostas.resposta412(res, error);
        });
    }
  };

  const _put = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      tratarRespostas.resposta422(res, errors);
    } else {
      _repository
        .update(req.body)
        .then((data) => {
          tratarRespostas.respostaAlteracao200(res, data);
        })
        .catch((error) => {
          tratarRespostas.resposta412(res, error);
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
module.exports = createCategoriaDefaultController;
