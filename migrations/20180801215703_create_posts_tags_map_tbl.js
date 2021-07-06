
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('posts_tags_map', function(table){
      table.integer('posts_id').references('id').inTable('posts');
      table.integer('tags_id').references('id').inTable('tags');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('posts_tags_map')
  ])
};
