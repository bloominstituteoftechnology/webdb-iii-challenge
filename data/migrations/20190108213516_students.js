
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table=> {
    // we must use the callback syntax for .createTable()
    table.increments('Id'); // pass the name if you wanted to be called anything other than id
    table
    .integer('cohort_id')
      .notNullable()
      .references('id')
      .inTable('cohorts')
      ;
      table.string('name', 100).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};


