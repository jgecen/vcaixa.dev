const createRepository = (config) => {
  const _knex = config.knex;
  const _table = config.table;

  const _save = (obj) => {
    return _knex(_table).returning("*").insert(obj);
  };

  const _update = (obj) => {
    return _knex(_table).where({ id: obj.id }).returning("*").update(obj);
  };

  const _del = (id) => {
    return _knex(_table).where({ id }).returning(["id"]).del();
  };

  const _getAll = () => {
    return _knex.select().table(_table);
  };

  const _get = (id) => {
    return _knex(_table).first().where({ id: id });
  };

  return {
    getAll: _getAll,
    update: _update,
    del: _del,
    get: _get,
    save: _save
  };
};

module.exports = createRepository;
