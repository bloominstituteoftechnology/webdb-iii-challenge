
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tb1) {
    tb1.increments('id');
    tb1.integer('userId')
      .notNullable()
      .references('id')
      .inTable('users');
    tb1.string('text').notNullable();
    tb1.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');    
};
