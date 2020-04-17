var knexFactory = require("knex");
var knexConfig = require("../knexfile");
var knex = knexFactory(knexConfig.development);
if (process.env.NODE_ENV == "test") {
  knex = knexFactory(knexConfig.test);
}

module.exports = knex;
