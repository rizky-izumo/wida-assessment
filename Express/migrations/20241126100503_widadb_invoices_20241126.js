/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("invoices", (table) => {
    table.string("invoice_no").primary().notNullable()
    table.date("invoice_date").notNullable()
    table.string("customer_name").notNullable()
    table.string("salesperson_name").notNullable()
    table.string("payment_type").notNullable()
    table.string("notes").notNullable()
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('invoices');
};
