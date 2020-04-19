const knex = require("../../src/knex");
const createEmpresaService = require("../../src/service/create.empresa.service");
const empresaService = createEmpresaService();

let dev = null;
let empresa = null;

describe("Teste de Service Empresa", () => {
  afterAll(async () => {
    await knex("empresas").del();
    await knex("devs").del();
  });

  /*
    const respRelationMovimento = await knex("categorias")
      .returning(["id"])
      .insert({ nome: "Transporte" });
    idCategoria = respRelationMovimento.pop().id;

  */
  beforeAll(async () => {
    const returnDev = await knex("devs").returning(["*"]).insert({ urn: "tecnospeed" });
    dev = returnDev.pop();
    const returnEmpresa = await knex("empresas")
      .returning(["*"])
      .insert({ dev_id: dev.id, nome: "Centauro" });
    empresa = returnEmpresa.pop();
  });

  test("testando a function empresaService.save, sucesso", async () => {
    const data = await empresaService.save("tecnospeed", { nome: "Mercado Canção" });
    expect(data).not.toBeNull();
  });
  test("testando a function empresaService.empresaPertenceAoDev, sucesso", async () => {
    const data = await empresaService.empresaPertenceAoDev(empresa.id, dev.urn);
    expect(data).toBeTruthy();
  });
});
