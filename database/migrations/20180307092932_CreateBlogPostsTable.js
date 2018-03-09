exports.up = function(knex, Promise) {
  return knex.schema.createTable('blogposts', tbl => {
    tbl.increments();

    tbl
      .integer('postId')
      .unsigned()
      .references('id')
      .inTable('posts')
      .notNullable();

    tbl
      .integer('tag')
      .unsigned()
      .references('id')
      .inTable('tags');

    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('blogposts');
};
