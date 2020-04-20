const knex = require("../../src/knex");
const app = require("../../src/server");
const supertest = require("supertest");
const data = require("../data/movimentos.data");
const request = supertest(app);

let idCategoria = null;
let idEmpresa = null;
let urnDev = null;

describe("Teste de Service de Movimentos", () => {
  afterAll(async () => {
    await knex("movimentos").del();
    await knex("categorias").del();
    await knex("empresas").del();
    await knex("devs").del();
  });

  beforeAll(async () => {
    const returnDev = await knex("devs").returning(["*"]).insert({ urn: "tecnospeed" });
    const dev = returnDev.pop();
    const idDev = dev.id;
    urnDev = dev.urn;

    const returnEmpresa = await knex("empresas")
      .returning(["*"])
      .insert({ dev_id: idDev, nome: "Centauro" });
    idEmpresa = returnEmpresa.pop().id;

    const respRelationMovimento = await knex("categorias")
      .returning(["id"])
      .insert({ empresa_id: idEmpresa, nome: "Transporte" });
    idCategoria = respRelationMovimento.pop().id;

    data.forEach((element) => {
      element.categoria_id = idCategoria;
      element.empresa_id = idEmpresa;
    });
    await knex("movimentos").insert(data);
  });

  it("POST /movimentos SUCESS 201", (done) => {
    request
      .post(`/movimentos/${urnDev}/${idEmpresa}`)
      .send({
        categoria_id: idCategoria,
        empresa_id: idEmpresa,
        tipo: "D",
        descricao: "Combustível",
        valor: 50
      })
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

  it("GET /resumo SUCESS 200", (done) => {
    request
      .get(`/movimentos/${urnDev}/${idEmpresa}/resumo`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body).not.toBeNull();
        return done();
      });
  });
});
