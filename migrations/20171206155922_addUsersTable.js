
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tb1) {
    tb1.increments('id');
    tb1.string('name', 128).notNullable();
    tb1.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
