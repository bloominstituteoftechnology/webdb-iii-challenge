exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', posts => {
    posts.increments();
    posts.text('text').notNullable();
    posts
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users');

    posts.timestamp('created_at').defaultTo(knex.fn.now());
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
