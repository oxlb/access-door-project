/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("access_log", (table) => {
    table.increments("id").primary(); // Primary key
    table.string("name"); // name or identifier for the user
    table.timestamp("accessed_at").defaultTo(knex.fn.now()); // Timestamp of the log entry
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("access_log");
};
