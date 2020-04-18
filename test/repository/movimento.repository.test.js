const knex = require("../../src/knex");
const factory = require("../../src/repository/factory.repository");
const data = require("../data/movimentos.data");
const movimentoRepository = factory.createRepositoryMovimento();
let idCategoria = null;

describe("Teste de Repository de Movimentos", () => {
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

  test("testando a function save, sucesso", async () => {
    const data = await movimentoRepository.save({
      categoria_id: idCategoria,
      tipo: "D",
      descricao: "Passagem viagem para São Paulo",
      valor: 210.23
    });
    expect(data).not.toBeNull();
  });

  test("testando a function movimentoRepository.listMovimentosDoDia, sucesso", async () => {
    const data = await movimentoRepository.listMovimentosDoDia();
    //console.log(data);
    expect(data).not.toBeNull();
  });
});
