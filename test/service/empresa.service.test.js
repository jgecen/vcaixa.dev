const knex = require("../../src/knex");
const createEmpresaService = require("../../src/service/create.empresa.service");
const empresaService = createEmpresaService();

describe("Teste de Service Empresa", () => {
  afterAll(async () => {
    await knex("empresas").del();
    await knex("devs").del();
  });

  beforeAll(async () => {
    await knex("devs").insert({ urn: "tecnospeed" });
  });

  test("testando a function empresaService.save, sucesso", async () => {
    const data = await empresaService.save("tecnospeed", { nome: "Mercado Canção" });
    expect(data).not.toBeNull();
  });
});
