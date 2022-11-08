/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("leagues", function (table) {
        table.increments("id").primary();
        table
          .integer("league_Id")
          .notNullable();
        table
          .string("league_name", 255)
          .notNullable()
        table
          .string("league_logo", 555)
          .notNullable()
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("leagues");
};
