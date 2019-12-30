exports.up = function(knex, Promise) {
  return knex.schema.createTable('post_tags', (tbl) => {
    tbl.increments();

    tbl.integer('postId').unsigned().notNullable().references('postId').inTable('posts');
    tbl.integer('tagId').unsigned().notNullable().references('tagId').inTable('tags');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('post_tags');
};