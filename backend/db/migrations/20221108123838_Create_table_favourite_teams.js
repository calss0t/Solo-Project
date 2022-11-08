/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("favourite_teams", function (table) {
        table.increments("id").primary();
        table
          .integer("teamId")
          .notNullable();
        table
          .string("teamName", 255)
          .notNullable()
        table
        .integer("user_id").references("id").inTable("users");
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("favourite_teams");
};
