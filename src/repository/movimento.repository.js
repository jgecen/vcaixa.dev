const createDefaultRepository = require("./default.repository");

const createMovimentoRepository = (config) => {
  const _knex = config.knex;
  const _deafultRepository = createDefaultRepository({ knex: _knex, table: "movimentos" });

  const _listMovimentosDoDia = () => {
    return _knex("movimentos")
      .select()
      .join("categorias", "movimentos.categoria_id", "categorias.id")
      .select(
        "movimentos.id as id",
        "movimentos.data as data",
        "movimentos.tipo as tipo",
        "movimentos.valor as valor",
        "categorias.id as idCategoria",
        "categorias.nome as nomeCategoria"
      )
      .where({ data: new Date() });
  };

  return {
    save: _deafultRepository.save,
    listMovimentosDoDia: _listMovimentosDoDia
  };
};

module.exports = createMovimentoRepository;
