const createRepository = require('./default.repository');
const createCategoriaRepository = (config) => {
  const _knex = config.knex;  
  const _table = "categorias";  
  const _repository = createRepository({knex: _knex, table: _table})

  const _getAll = (idEmpresa) => {
    return _knex(_table).select().where({ empresa_id: idEmpresa });
  };

  return {
    getAll: _getAll,
    update: _repository.update,
    del: _repository.del,
    get: _repository.get,
    save: _repository.save
  };
};

module.exports = createCategoriaRepository;
