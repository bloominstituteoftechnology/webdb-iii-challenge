
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    tbl.increments(); // generates a primary key called id and makes it autoincrement
    tbl.string('name', 128).notNullable().unique('name');
    // cohort_id references the id in the cohorts table
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students');
};

// knex migrate:make students_table
// knex migrate:latest
// knex migrate:rollback