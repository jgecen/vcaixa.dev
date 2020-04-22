const createDefaultRepository = require("./default.repository");

const createDevRepository = (config) => {
  const _knex = config.knex;
  const _repository = createDefaultRepository({ knex: _knex, table: "devs" });

  const _devByUrn = (urn) => {
    return _knex("devs").first().where({ urn: urn });
  };

  return {
    devByUrn: _devByUrn,
    getAll: _repository.getAll,
    update: _repository.update,
    del: _repository.del,
    get: _repository.get,
    save: _repository.save
  };
};

module.exports = createDevRepository;
