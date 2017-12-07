
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posttags', function(tb1) {
        tb1.increments('id');
        tb1.integer('postId')
          .notNullable()
          .references('id')
          .inTable('posts');
        tb1.integer('tagId')
          .notNullable()
          .references('id')
          .inTable('tags');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posttags');
  };
  