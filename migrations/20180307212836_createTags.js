
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', (tbl) => {
    tbl.increments('tagId');

    tbl.string('tag', 16).notNullable().unique('tags');

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('tags');
};
