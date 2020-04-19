exports.up = function (knex) {
  return knex.schema.createTable("devs", function (table) {
    table.increments("id");
    table.string("urn").notNullable().unique();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("devs");
};
