exports.up = function(knex, Promise) {
    return knex.schema.createTable('Posts', tbl => {
      tbl.increments('id');
      tbl
        .integer('userId')
        .notNullable()
        .references('id')
        .inTable('Users');
      tbl.string('text').notNullable();
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Posts');
  };