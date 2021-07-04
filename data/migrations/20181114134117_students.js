exports.up = function (knex, Promise) {
  //makes changes to the database
  return knex.schema.createTable('students', function (tbl) {
    //primary key
    tbl.increments();
    //other fields
    tbl.string('name', 255).unique();
    tbl
      .integer('cohort_id')
      .unsigned().references('id')
      .inTable('cohorts')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};