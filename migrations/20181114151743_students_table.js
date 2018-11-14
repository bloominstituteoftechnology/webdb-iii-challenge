
exports.up = function(knex, Promise) {
  
  return knex.schema.createTable('students', function(table) {
    table.increments('id').primary();

    table.string('name', 256).notNullable();

    table
      .integer('cohorts_id')
      .references('id')
      .inTable('cohorts');
      
  });
};

exports.down = function(knex, Promise) {
  
};
