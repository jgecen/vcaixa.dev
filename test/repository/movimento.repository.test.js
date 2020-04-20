const knex = require("../../src/knex");
const factory = require("../../src/repository/factory.repository");
const data = require("../data/movimentos.data");
const movimentoRepository = factory.createRepositoryMovimento();
let idCategoria = null;
let idEmpresa = null;

describe("Teste de Repository de Movimentos", () => {
  afterAll(async () => {
    await knex("movimentos").del();
    await knex("categorias").del();
    await knex("empresas").del();
    await knex("devs").del();
  });

  beforeAll(async () => {
    const returnDev = await knex("devs").returning(["*"]).insert({ urn: "tecnospeed" });
    const idDev = returnDev.pop().id;

    const returnEmpresa = await knex("empresas")
      .returning(["*"])
      .insert({ dev_id: idDev, nome: "Centauro" });
    idEmpresa = returnEmpresa.pop().id;

    const respRelationMovimento = await knex("categorias")
      .returning(["id"])
      .insert({ empresa_id: idEmpresa, nome: "Transporte" });
    idCategoria = respRelationMovimento.pop().id;

    data.forEach((element) => {
      element.categoria_id = idCategoria;
      element.empresa_id = idEmpresa;
    });
    await knex("movimentos").insert(data);
  });

  test("testando a function save, sucesso", async () => {
    const data = await movimentoRepository.save({
      categoria_id: idCategoria,
      empresa_id: idEmpresa,
      tipo: "D",
      descricao: "Passagem viagem para São Paulo",
      valor: 210.23
    });
    expect(data).not.toBeNull();
  });

  test("testando a function movimentoRepository.listMovimentosDoDia, sucesso", async () => {
    const data = await movimentoRepository.listMovimentosDoDia(idEmpresa);
    //console.log(data);
    expect(data).not.toBeNull();
  });
});
