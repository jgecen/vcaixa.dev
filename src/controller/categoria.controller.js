const { validationResult } = require("express-validator");
const factoryRepo = require("../../src/repository/factory.repository");
const createControl = require("./default.controller");

const createDefaultController = () => {
  const _repository = factoryRepo.createRepositoryCategoria();
  console.log(_repository);
  return createControl(_repository);
};

module.exports = createDefaultController;
