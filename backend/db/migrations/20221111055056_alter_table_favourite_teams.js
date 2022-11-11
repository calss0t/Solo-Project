/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("favourite_teams", function (table) {
    table.dropColumn("teamName");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("favourite_teams", function (table) {
    table.string("teamName", 255).notNullable();
  });
};
