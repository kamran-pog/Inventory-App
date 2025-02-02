exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.integer('password').notNullable();
    });
  };
  
exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
