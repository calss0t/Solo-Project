/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("favourite_leagues", function (table) {
        table.increments("id").primary();
        table
          .integer("leagueId")
          .notNullable();
        table
        .integer("user_id").references("id").inTable("users");
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("favourite_leagues");
};
