const knexDefault = require("../knex");

const factoryRepository = {
  createRepositoryCategoria: (knex = knexDefault) => {
    return createRepository({ knex, table: "categorias" });
  }
};

const createRepository = (config) => {
  const _knex = config.knex;

  const _save = (obj) => {
    return _knex(config.table).returning("*").insert(obj);
  };

  const _getAll = () => {
    return _knex.select().table(config.table);
  };

  return {
    save: _save,
    getAll: _getAll
  };
};

module.exports = factoryRepository;
