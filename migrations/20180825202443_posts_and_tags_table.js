
exports.up = function(knex, Promise) {
  return knex.schema.createTable('postsTags', function(tbl) {
          tbl.integer('postsId').references('id').inTable('posts');
          tbl.integer('tagsId').references('id').inTable('tags');
          tbl.timestamp('createdAt').defaultTo(knex.fn.now())
      })
};

exports.down = function(knex, Promise) {
  // drop the postTags table
  return knex.schema.dropTableIfExists('postsTags');
};
