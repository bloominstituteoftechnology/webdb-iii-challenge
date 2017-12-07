
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function(tb1) {
      tb1.increments('id');
      tb1.string('tag', 16).notNullable().unique('tag', 'uq_tags_tag');
      tb1.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
  };