exports.up = function (knex) {
  return knex.schema.createTable("movimentos", function (table) {
    table.increments("id");
    table.biginteger("categoria_id").references("id").inTable("categorias").notNullable();
    table.enu("tipo", ["D", "C"]).notNullable();
    table.string("descricao").notNullable();
    table.decimal("valor").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("movimentos");
};
