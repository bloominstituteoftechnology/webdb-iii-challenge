
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tbl) {
      tbl.increments('id');
      tbl.string('tag', 16).unique('tag', 'uq_tag_id');
      tbl.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
