exports.up = function(knex, Promise) {
  return knex.schema.createTable('PostTags', function(tbl) {
    tbl.increments('id'); // primary key

    tbl
      .integer('postId')
      .notNullable()
      .references('id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('tagId')
      .notNullable()
      .references('id')
      .inTable('tags')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('PostTags');
};

