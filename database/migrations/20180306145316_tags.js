exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', tbl => {
    tbl.increments();

    tbl
      .integer('tagId')
      .unsigned()
      .references('id')
      .inTable('posts');
    tbl
      .string('tag', 128)
      .notNullable()
      .unique('tag');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
