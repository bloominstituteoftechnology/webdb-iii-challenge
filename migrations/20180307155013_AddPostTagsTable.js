
exports.up = function(knex, Promise) {
  return knex.schema.createTable('postTags', tbl => {
    tbl.increments('id');

    tbl.integer('postId').notNullable().references('id').inTable('posts');
    tbl.integer('tagId').notNullable().references('id').inTable('tags');
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('postTags');
};
