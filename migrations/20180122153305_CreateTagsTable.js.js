
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Tags', function(tb1) {
        tb1
            .primary()
            .increments('id');
        tb1
            .string('tag', 16)
            .notNullable()
            .unique('tag', 'uq_tag_name');
        tb1.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('Tags')
  };