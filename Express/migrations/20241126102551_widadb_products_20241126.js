/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("products", (table) => {
    table.string('invoice_no').references('invoice_no').inTable('invoices').notNullable();
    table.string("item_name").notNullable()
    table.integer("quantity").notNullable()
    table.decimal("total_cost_of_goods_sold", 10, 2).notNullable()
    table.decimal("total_price_sold", 10, 2).notNullable()
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('products');
};
