const factoryRepository = require("../repository/factory.repository");

const createEmpresaService = () => {
  const _devRepo = factoryRepository.createRepositoryDev();
  const _empresaRepo = factoryRepository.createRepositoryEmpresa();

  const _save = (urn, empresa) => {
    return _devRepo.devByUrn(urn).then((result) => {
      empresa.dev_id = result.id;
      return _empresaRepo.save(empresa);
    });
  };

  return {
    save: _save
  };
};

module.exports = createEmpresaService;
