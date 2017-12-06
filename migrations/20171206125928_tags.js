
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', (tbl) => {
    tbl.increments('tag_id');
    tbl.string('tag', 16);
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
