/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("access_code", (table) => {
    table.increments("id").primary(); // Primary key
    table.string("code").notNullable(); // Access code
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Timestamp of creation
  });

  // Insert a single row with an access code
  await knex("access_code").insert({ code: "XYZ123" });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("access_code");
};
