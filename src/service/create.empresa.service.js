const factoryRepository = require("../repository/factory.repository");

const createEmpresaService = () => {
  const _devRepo = factoryRepository.createRepositoryDev();
  const _empresaRepo = factoryRepository.createRepositoryEmpresa();

  const _save = async (urn, empresa) => {
    const dev = await _devRepo.devByUrn(urn);
    empresa.dev_id = dev.id;
    return await _empresaRepo.save(empresa);
  };

  const _empresaPertenceAoDev = async (idEmpresa, urnDev) => {
    const dev = await _devRepo.devByUrn(urnDev);
    const empresa = await _empresaRepo.get(idEmpresa);
    return dev && empresa && dev.id == empresa.dev_id;
  };
  return {
    save: _save,
    empresaPertenceAoDev: _empresaPertenceAoDev
  };
};

module.exports = createEmpresaService;
