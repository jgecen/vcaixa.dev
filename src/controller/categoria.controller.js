const { validationResult } = require("express-validator");
const factoryRepo = require("../../src/repository/factory.repository");
const tratarRespostas = require("./respostas");
const createController = require("./default.controller");

const createCategoriaController = () => {
  const _repository = factoryRepo.createRepositoryCategoria();
  const _controller = createController(_repository);

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

  return {
    getAll: _getAll,
    post: _controller.post,
    put: _controller.put,
    get: _controller.get,
    del: _controller.del
  };
};
module.exports = createCategoriaController;
