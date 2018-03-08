exports.up = function(knex, Promise) {
  return knex.schema.createTable('postTags', tbl => {
    tbl.increments();
    tbl
    .integer('postId')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('posts');
    tbl
    .integer('tagId')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('posts');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('postTags');
};

//add this in

