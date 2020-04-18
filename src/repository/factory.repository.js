const knexDefault = require("../knex");
const createRepository = require("./method.default.repository");
const createRepositoryMovimento = require("./method.movimento.repository");

const factoryRepository = {
  createRepositoryCategoria: (knex = knexDefault) => {
    return createRepository({ knex, table: "categorias" });
  },
  createRepositoryMovimento: (knex = knexDefault) => {
    return createRepositoryMovimento({ knex });
  }
};

module.exports = factoryRepository;
