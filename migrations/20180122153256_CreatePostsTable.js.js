
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Posts', function(tb1) {
        tb1
            .primary()
            .increments('id');
        tb1.
            integer('userId').unsigned().references('id').inTable('Users')
        tb1
            .string('text')
            .notNullable()
        tb1.timestamp('createdAt').defaultTo(knex.fn.now())
    })
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('Posts')
  };