const knex = require("../../src/knex");
const app = require("../../src/server");
const supertest = require("supertest");
const request = supertest(app);
let categoriaForUpdateAndGet = null;
let categoriaForDel = null;
let urnDev = null;
let idEmpresa = null;

describe("Teste de endpoint categorias ", () => {
  afterAll(async () => {
    await knex("categorias").del();
    await knex("empresas").del();
    await knex("devs").del();
  });

  beforeAll(async () => {
    const returnDev = await knex("devs").returning(["*"]).insert({ urn: "tecnospeed" });
    const dev = returnDev.pop();
    const returnEmpresa = await knex("empresas")
      .returning(["*"])
      .insert({ dev_id: dev.id, nome: "Centauro" });
    const empresa = returnEmpresa.pop();
    urnDev = dev.urn;
    idEmpresa = empresa.id;

    await knex("categorias").insert([
      { empresa_id: empresa.id, nome: "Folha de Pagamento" },
      { empresa_id: empresa.id, nome: "Categoria 1" },
      { empresa_id: empresa.id, nome: "Categoria 2" },
      { empresa_id: empresa.id, nome: "Categoria 3" }
    ]);

    const respCategoriaForUpdate = await knex("categorias")
      .returning("*")
      .insert({ empresa_id: empresa.id, nome: "Categoria para alteração" });
    categoriaForUpdateAndGet = respCategoriaForUpdate.pop();

    const respCategoriaForDel = await knex("categorias")
      .returning("*")
      .insert({ empresa_id: empresa.id, nome: "Categoria para Exclusão" });
    categoriaForDel = respCategoriaForDel.pop();
  });

  it("POST /categorias SUCESS 201", (done) => {
    request
      .post(`/categorias/${urnDev}/${idEmpresa}`)
      .send({ nome: "Despesas Alimentícias", empresa_id: idEmpresa })
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
      .put(`/categorias/${urnDev}/${idEmpresa}`)
      .send({ id: categoriaForUpdateAndGet.id, nome: "ALTERADO", empresa_id: idEmpresa })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.recurso.pop().nome).toBe("ALTERADO");

        return done();
      });
  });

  it("POST /categorias ERR 422", (done) => {
    request
      .post(`/categorias/${urnDev}/${idEmpresa}`)
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
      .get(`/categorias/${urnDev}/${idEmpresa}`)
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

  it("GET /categorias/id SUCESS 200", (done) => {
    const id = categoriaForUpdateAndGet.id;
    request
      .get(`/categorias/${urnDev}/${idEmpresa}/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(id).toEqual(res.body.id);
        return done();
      });
  });

  it("DELETE /categorias/id SUCESS 200", (done) => {
    const id = categoriaForDel.id;
    request
      .delete(`/categorias/${urnDev}/${idEmpresa}/${id}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect("Recurso excluido com sucesso!").toEqual(res.body.message);
        return done();
      });
  });
});
