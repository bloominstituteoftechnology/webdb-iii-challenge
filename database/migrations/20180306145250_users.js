exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users
      .string('name', 128)
      .notNullable()
      .unique();
    users.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
