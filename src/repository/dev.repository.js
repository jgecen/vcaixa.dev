const createDefaultRepository = require("./default.repository");

const createDevRepository = (config) => {
  const _knex = config.knex;
  const _deafultRepository = createDefaultRepository({ knex: _knex, table: "devs" });

  const _devByUrn = (urn) => {
    return _knex("devs").first().where({ urn: urn });
  };

  return {
    devByUrn: _devByUrn
  };
};

module.exports = createDevRepository;
