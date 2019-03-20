
exports.up = function(knex, Promise) {
  //define our students table
  return knex.schema.createTable('students', table => {
    table.increments(); //Adds auto increment to id field
    table.string('name', 128)
      .notNullable()

      //we want a cohort_id foreign key
      table.integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  // remove out students table
  return knex.schema.dropTableIfExists('students');
};
