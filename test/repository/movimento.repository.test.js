const knex = require("../../src/knex");
const factory = require("../../src/repository/factory.repository");
const movimentoRepository = factory.createRepositoryMovimento();
let idRelationMovimento = null;

describe("Teste de Repository de Categoria", () => {
  afterAll(async () => {
    await knex("movimentos").del();
    await knex("categorias").del();
  });

  beforeAll(async () => {
    const respRelationMovimento = await knex("categorias")
      .returning(["id"])
      .insert({ nome: "Transporte" });
    idRelationMovimento = respRelationMovimento.pop().id;
  });

  test("testando a function save, sucesso", async () => {
    const data = await movimentoRepository.save({
      categoria_id: idRelationMovimento,
      tipo: "D",
      descricao: "Passagem viagem para São Paulo",
      valor: 210.23
    });
    expect(data).not.toBeNull();
  });
});
