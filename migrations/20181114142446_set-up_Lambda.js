const knex = require('knex');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(table) {
    table
      .increments('id')
      .primary()
      .notNullable();

    table
      .string('name', 256)
      .notNullable();

  })
};

exports.down = function(knex, Promise) {
   
  return knex.schema.dropTableIfExists('cohorts') 
};
