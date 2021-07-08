
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (tbl) => {
    tbl.increments('post_id');
    tbl.integer('user_id')
      .notNullable()
      .references('user_id')
      .inTable('users');
    tbl.string('text')
      .notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
