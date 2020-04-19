const knex = require("../../src/knex");
const factory = require("../../src/repository/factory.repository");
const data = require("../data/movimentos.data");
const devRepository = factory.createRepositoryDev();

describe("Teste de Repository de Devs", () => {
  afterAll(async () => {
    await knex("devs").del();
  });

  beforeAll(async () => {
    await knex("devs").insert({ urn: "tecnospeed" });
  });

  test("testando a function devRepository.devByUrn, sucesso", async () => {
    const data = await devRepository.devByUrn("tecnospeed");
    expect(data).not.toBeNull();
  });
});
