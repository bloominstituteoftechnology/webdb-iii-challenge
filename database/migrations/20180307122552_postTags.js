exports.up = function(knex, Promise) {
  return knex.schema.createTable('postTags', tbl => {
    tbl
      .integer('postId')
      .unsigned()
      .references('postId')
      .inTable('posts');
    tbl
      .integer('tagId')
      .unsigned()
      .references('tagId')
      .inTable('tags');
  });

  knex('posts')
    .join('postTags', 'postId', 'tags.postId')
    .select('postId', 'tags.postTags');
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('postTags');
};
