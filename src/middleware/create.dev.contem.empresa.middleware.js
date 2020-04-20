const createEmpresaService = require("../service/create.empresa.service");

const createDevEmpresaMiddleware = () => {
  const empresaService = createEmpresaService();

  const _devContemEmpresa = (req, res, next) => {
    const urnDev = req.params.urnDev;
    const idEmpresa = req.params.idEmpresa;

    empresaService
      .empresaPertenceAoDev(idEmpresa, urnDev)
      .then((empresaPertenceAoDev) => {
        if (!empresaPertenceAoDev) {
          res.status(400);
          res.send({
            message: `A empresa com o id:${idEmpresa}, não pertence a Dev com urn:${urnDev}`
          });
        } else {
          next();
        }
      })
      .catch((err) => {
        res.status(400);
        res.send({ erro: err });
      });
  };

  return {
    devContemEmpresa: _devContemEmpresa
  };
};

module.exports = createDevEmpresaMiddleware;
