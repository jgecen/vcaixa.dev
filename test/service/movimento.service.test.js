const knex = require("../../src/knex");
const data = require("../data/movimentos.data");
const createMovimentoService = require("../../src/service/create.movimento.service");
const movimentoService = createMovimentoService();
let idCategoria = null;

describe("Teste de Service de Movimentos", () => {
  afterAll(async () => {
    await knex("movimentos").del();
    await knex("categorias").del();
  });

  beforeAll(async () => {
    const respRelationMovimento = await knex("categorias")
      .returning(["id"])
      .insert({ nome: "Transporte" });
    idCategoria = respRelationMovimento.pop().id;

    data.forEach((element) => {
      element.categoria_id = idCategoria;
    });
    await knex("movimentos").insert(data);
  });

  test("testando a function movimentoService.movimentosDoDia, sucesso", async () => {
    const data = await movimentoService.movimentosDoDia();
    console.log(data);
    expect(data).not.toBeNull();
  });
});
