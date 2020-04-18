const knexDefault = require("../knex");

const factoryRepository = {
  createRepositoryCategoria: (knex = knexDefault) => {
    return createRepository({ knex, table: "categorias" });
  },
  createRepositoryMovimento: (knex = knexDefault) => {
    return createRepository({ knex, table: "movimentos" });
  }
};

const createRepository = (config) => {
  const _knex = config.knex;

  const _save = (obj) => {
    return _knex(config.table).returning("*").insert(obj);
  };

  const _update = (obj) => {
    return _knex(config.table).where({ id: obj.id }).returning("*").update(obj);
  };

  const _del = (id) => {
    return _knex(config.table).where({ id }).returning(["id"]).del();
  };

  const _getAll = () => {
    return _knex.select().table(config.table);
  };

  return {
    save: _save,
    getAll: _getAll,
    update: _update,
    del: _del
  };
};

module.exports = factoryRepository;
