const factoryRepository = require("../repository/factory.repository");

const createMovimentoService = () => {
  const _repositoryMovimento = factoryRepository.createRepositoryMovimento();

  const _movimentosDoDia = () => {
    return _repositoryMovimento.listMovimentosDoDia().then((result) => {
      return _buildResut(result);
    });
  };
  const _buildResut = (result) => {
    return new Promise((resolve, reject) => {
      resolve({
        saldoTotal: result.reduce(_reduceSaltoTotal, 0),
        movimentacoes: result.map(_mapRow)
      });
    });
  };
  const _reduceSaltoTotal = (saldoTotal, row) => {
    if (row.tipo == "D") {
      return saldoTotal - parseFloat(row.valor);
    }
    return saldoTotal + parseFloat(row.valor);
  };
  const _mapRow = (row) => {
    const _id = row.id;
    const _data = row.data;
    const _tipo = row.tipo;
    const _valor = row.valor;
    const _categoria = { id: row.idCategoria, nome: row.nomeCategoria };
    const _idc = row.idCategoria;
    const _nomec = row.nomeCategoria;
    return {
      id: _id,
      data: _data,
      tipo: _tipo,
      valor: _valor,
      categoria: _categoria
    };
  };

  return {
    movimentosDoDia: _movimentosDoDia
  };
};

module.exports = createMovimentoService;
