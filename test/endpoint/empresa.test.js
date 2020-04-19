const knex = require("../../src/knex");
const app = require("../../src/server");
const supertest = require("supertest");
const request = supertest(app);
let categoriaForUpdate = null;

describe("Teste de endpoint empresas ", () => {
  afterAll(async () => {
    await knex("empresas").del();
    await knex("devs").del();
  });

  beforeAll(async () => {
    await knex("devs").insert({ urn: "tecnospeed" });
  });

  it("POST /empresas/:urn SUCESS 201", (done) => {
    request
      .post("/empresas/tecnospeed")
      .send({ nome: "Mercado Canção" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).not.toBeNull();
        expect("Recurso criado com sucesso!").toEqual(res.body.message);
        done();
      });
  });
});
