const knex = require("../../src/knex");
const app = require("../../src/server");
const crateDevMiddleware = require("../../src/middleware/create.dev.middleware");
const supertest = require("supertest");
let request = null;
let dev = null;
let empresa = null;

describe("Teste de endpoint empresas ", () => {
  afterAll(async () => {
    await knex("empresas").del();
    await knex("devs").del();
  });

  beforeAll(async () => {
    const middleware = crateDevMiddleware();
    app.get("/test/:urnDev/:idEmpresa", middleware.devContemEmpresa);

    app.get("/test/:urnDev/:idEmpresa", (req, res) => {
      const urnDev = req.params.urnDev;
      const idEmpresa = req.params.idEmpresa;
      res.status(200);
      res.send({ message: `Dev com urn:${urnDev}, Empresa com id:${idEmpresa}` });
    });

    request = supertest(app);

    const returnDev = await knex("devs").returning(["*"]).insert({ urn: "tecnospeed" });
    dev = returnDev.pop();

    const returnEmpresa = await knex("empresas")
      .returning(["*"])
      .insert({ dev_id: dev.id, nome: "Centauro" });
    empresa = returnEmpresa.pop();
  });

  it("GET /test/:urnDev/:idEmpresa SUCESS 200", (done) => {
    const urnDev = dev.urn;
    const idEmpresa = empresa.id;

    request
      .get(`/test/${urnDev}/${idEmpresa}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).not.toBeNull();
        expect(`Dev com urn:${urnDev}, Empresa com id:${idEmpresa}`).toEqual(res.body.message);
        done();
      });
  });
  it("GET /test/:urnDev/:idEmpresa ERROR 400", (done) => {
    const urnDev = dev.urn;
    //id de uma empresa que não existe
    const idEmpresa = parseInt(empresa.id) + 1;
    request
      .get(`/test/${urnDev}/${idEmpresa}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).not.toBeNull();
        expect(`A empresa com o id:${idEmpresa}, não pertence a Dev com urn:${urnDev}`).toEqual(
          res.body.message
        );
        done();
      });
  });
});
