const knex = require("../../src/knex");
const app = require("../../src/server");
const supertest = require("supertest");
const request = supertest(app);
let categoriaForUpdate = null;

describe("Teste de endpoint categorias ", () => {
  afterAll(async () => {
    await knex("categorias").del();
  });

  beforeAll(async () => {
    await knex("categorias").insert([
      { nome: "Categoria 1" },
      { nome: "Categoria 2" },
      { nome: "Categoria 3" }
    ]);

    const respCategoriaForUpdate = await knex("categorias")
      .returning("*")
      .insert({ nome: "Categoria para alteração" });
    categoriaForUpdate = respCategoriaForUpdate.pop();
  });

  it("POST /categorias SUCESS 201", (done) => {
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

  it("PUT /categorias SUCESS 200", (done) => {
    request
      .put("/categorias")
      .send({ id: categoriaForUpdate.id, nome: "ALTERADO" })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.categoria.pop().nome).toBe("ALTERADO");

        return done();
      });
  });

  it("POST /categorias ERR 422", (done) => {
    request
      .post("/categorias")
      .send({ nome: "" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.errors.length > 0).toBeTruthy();
        return done();
      });
  });

  it("GET /categorias SUCESS 200", (done) => {
    request
      .get("/categorias")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        return done();
      });
  });
});
