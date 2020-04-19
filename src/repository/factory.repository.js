const knexDefault = require("../knex");
const createRepository = require("./default.repository");
const createRepositoryMovimento = require("./movimento.repository");

const factoryRepository = {
  createRepositoryCategoria: (knex = knexDefault) => {
    return createRepository({ knex, table: "categorias" });
  },
  createRepositoryMovimento: (knex = knexDefault) => {
    return createRepositoryMovimento({ knex });
  }
};

module.exports = factoryRepository;
