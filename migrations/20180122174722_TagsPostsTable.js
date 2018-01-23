
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tagspost', (tbl) => {
    tbl.increments();
    tbl.integer('postId').references('id').inTable('posts').notNullable();
    tbl.integer('tagId').references('id').inTable('tags').notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tagspost');
};
