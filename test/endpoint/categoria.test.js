const knex = require("../../src/knex");
const app = require("../../src/server");
const supertest = require("supertest");
const request = supertest(app);

describe("Teste de endpoint categorias ", () => {
  afterAll(async () => {
    await knex("categorias").del();
  });

  it("POST /categorias", (done) => {
    request
      .post("/categorias")
      .send({ nome: "Despesas Alimentícias" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
