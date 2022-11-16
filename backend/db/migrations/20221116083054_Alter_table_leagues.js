/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("leagues", function (table) {
    table.string("League_Id_TheSportsDB", 255)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("leagues", function (table) {
    table.dropColumn("League_Id_TheSportsDB");
  });
};
