
exports.up = function(knex, Promise) {
  return knex.schema.createTable('boxes', table => {
    table.increments();
    table.integer('count').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('boxes');
};
