const knexDefault = require("../knex");
const createRepository = require("./default.repository");
const createRepositoryMovimento = require("./movimento.repository");
const createRepositoryDev = require("./dev.repository");

const factoryRepository = {
  createRepositoryCategoria: (knex = knexDefault) => {
    return createRepository({ knex, table: "categorias" });
  },
  createRepositoryEmpresa: (knex = knexDefault) => {
    return createRepository({ knex, table: "empresas" });
  },
  createRepositoryMovimento: (knex = knexDefault) => {
    return createRepositoryMovimento({ knex });
  },
  createRepositoryDev: (knex = knexDefault) => {
    return createRepositoryDev({ knex });
  }
};

module.exports = factoryRepository;
