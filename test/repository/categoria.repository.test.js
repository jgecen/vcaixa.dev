const knex = require("../../src/knex");
const factory = require("../../src/repository/factory.repository");
const categoriaRepository = factory.createRepositoryCategoria();
let idForDelete = null;
let categoriaForUpdate = null;
let dev = null;
let empresa = null;

describe("Teste de Repository de Categoria", () => {
  afterAll(async () => {
    await knex("categorias").del();
    await knex("empresas").del();
    await knex("devs").del();
  });

  beforeAll(async () => {
    const returnDev = await knex("devs").returning(["*"]).insert({ urn: "tecnospeed" });
    dev = returnDev.pop();
    const returnEmpresa = await knex("empresas")
      .returning(["*"])
      .insert({ dev_id: dev.id, nome: "Centauro" });
    empresa = returnEmpresa.pop();

    await knex("categorias").insert([
      { empresa_id: empresa.id, nome: "Folha de Pagamento" },
      { empresa_id: empresa.id, nome: "Categoria 1" },
      { empresa_id: empresa.id, nome: "Categoria 2" },
      { empresa_id: empresa.id, nome: "Categoria 3" }
    ]);

    const respCategoriaForDelete = await knex("categorias")
      .returning(["id"])
      .insert({ empresa_id: empresa.id, nome: "Categoria para teste de exclusão" });
    idForDelete = respCategoriaForDelete.pop().id;

    const respCategoriaForUpdate = await knex("categorias")
      .returning("*")
      .insert({ empresa_id: empresa.id, nome: "Categoria para alteração" });
    categoriaForUpdate = respCategoriaForUpdate.pop();
  });

  test("testando a function save, sucesso", async () => {
    const data = await categoriaRepository.save({ empresa_id: empresa.id, nome: "Combustíveis" });
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
      .getAll(empresa.id)
      .then((data) => {
        expect(data).not.toBeNull();
        expect(data.length > 3).toBeTruthy();
      })
      .catch((err) => {
        expect(err).toBeNull();
      });
  });
});
