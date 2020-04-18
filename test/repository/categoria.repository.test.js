const knex = require("../../src/knex");
const factory = require("../../src/repository/factory.repository");
const categoriaRepository = factory.createRepositoryCategoria();
let idForDelete = null;
let categoriaForUpdate = null;

describe("Teste de Repository de Categoria", () => {
  afterAll(async () => {
    await knex("categorias").del();
  });

  beforeAll(async () => {
    await knex("categorias").insert([
      { nome: "Folha de Pagamento" },
      { nome: "Categoria 1" },
      { nome: "Categoria 2" },
      { nome: "Categoria 3" }
    ]);

    const respCategoriaForDelete = await knex("categorias")
      .returning(["id"])
      .insert({ nome: "Categoria para teste de exclusão" });
    idForDelete = respCategoriaForDelete.pop().id;

    const respCategoriaForUpdate = await knex("categorias")
      .returning("*")
      .insert({ nome: "Categoria para alteração" });
    categoriaForUpdate = respCategoriaForUpdate.pop();
  });

  test("testando a function save, sucesso", async () => {
    const data = await categoriaRepository.save({ nome: "Combustíveis" });
    expect(data).not.toBeNull();
  });

  test("testando a function update, sucesso", async () => {
    categoriaForUpdate.nome = "CATEGORIA_ALTERADA";
    const data = await categoriaRepository.update(categoriaForUpdate);
    expect(data.pop().nome).toBe(categoriaForUpdate.nome);
  });

  test("testando a function del, sucesso", async () => {
    const respDelete = await categoriaRepository.del(idForDelete);
    expect(respDelete.pop().id).toBe(idForDelete);
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
        expect(data.length > 3).toBeTruthy();
      })
      .catch((err) => {
        expect(err).toBeNull();
      });
  });
});
