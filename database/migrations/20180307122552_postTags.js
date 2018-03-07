exports.up = function(knex, Promise) {
  return knex.schema.createTable('postTags', tbl => {
    tbl
      .integer('postId')
      .unsigned()
      .references('id')
      .inTable('posts');
    tbl
      .integer('tagId')
      .unsigned()
      .references('id')
      .inTable('tags');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('postTags');
};
