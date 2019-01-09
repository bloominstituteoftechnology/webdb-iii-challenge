exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(table){
        table.increments('id');
        table.integer('cohort_id').unsigned().references('id').inTable('cohorts');
        table.string('name').notNullable();
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
  };
  