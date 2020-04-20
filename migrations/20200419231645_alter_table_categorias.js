exports.up = function (knex) {
  return knex.schema.table("categorias", function (table) {
    table.biginteger("empresa_id").references("id").inTable("empresas").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.table("categorias", function (table) {
    table.dropColumn("empresa_id");
  });
};
