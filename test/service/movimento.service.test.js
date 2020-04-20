const knex = require("../../src/knex");
const data = require("../data/movimentos.data");
const createMovimentoService = require("../../src/service/create.movimento.service");
const movimentoService = createMovimentoService();
let idCategoria = null;
let idEmpresa = null;

describe("Teste de Service de Movimentos", () => {
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

  test("testando a function movimentoService.movimentosDoDia, sucesso", async () => {
    const data = await movimentoService.movimentosDoDia(idEmpresa);
    expect(data).not.toBeNull();
  });
});
