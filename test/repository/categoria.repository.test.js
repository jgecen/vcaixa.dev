const knex = require("../../src/knex");
const factory = require("../../src/repository/factory.repository");
const categoriaRepository = factory.createRepositoryCategoria();

describe("Teste de Repository de Categoria", () => {
  afterAll(async () => {
    await knex("categorias").del();
  });

  beforeAll(async () => {
    await knex("categorias").insert({ nome: "Folha de Pagamento" });
  });

  test("testando a function save, sucesso", async () => {
    const data = await categoriaRepository.save({ nome: "Combustíveis" });
    expect(data).not.toBeNull();
  });
  test("testando a function save, erro constrainst", () => {
    categoriaRepository
      .save({ nome: "Folha de Pagamento" })
      .then((data) => {
        expect(data).toBeNull();
      })
      .catch((err) => {
        expect(err).not.toBeNull();
      });
  });
  test("testando a function getAll", () => {
    categoriaRepository
      .getAll()
      .then((data) => {
        expect(data).not.toBeNull();
      })
      .catch((err) => {
        expect(err).toBeNull();
      });
  });
});
