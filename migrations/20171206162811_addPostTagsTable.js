exports.up = function(knex, Promise) {
  return knex.schema.createTable('PostsTags', tbl => {
    tbl.increments('id');
    tbl
      .integer('postId')
      .notNullable()
      .references('id')
      .inTable('Posts');
    tbl
      .integer('tagId')
      .notNullable()
      .references('id')
      .inTable('Tags');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('PostsTags');
};
