
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    // set up an id --> PK, AI
    tbl.increments();

    // set up a name column --> text, required, unique
    tbl.string('name', 128).notNullable();
    tbl.unique('name');

    // make reference to the cohort_id via reference
    tbl
      .integer('cohorts_id')
      .unsigned()
      .references('id')
      .inTable('cohorts');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
