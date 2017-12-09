
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Tags', function(tbl) {
      tbl.increments('id'); // primary key

      tbl.string('tag', 16).notNullable().unique('tag', 'uq_tags_tag');
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Tags');
};
