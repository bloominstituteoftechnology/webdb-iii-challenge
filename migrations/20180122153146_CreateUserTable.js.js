
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Users', function(tb1) {
      tb1
        .primary()
        .increments('id');
      tb1
        .string('name', 255)
        .notNullable()
        .unique('name', 'uq_user_name');
      tb1.timestamp('createdAt').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Users')
};
