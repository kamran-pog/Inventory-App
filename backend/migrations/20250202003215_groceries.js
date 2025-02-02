exports.up = function(knex) {
    return knex.schema.createTable('groceries', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('price_per_pound').notNullable();
        table.integer('units_available').notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('groceries');
};
