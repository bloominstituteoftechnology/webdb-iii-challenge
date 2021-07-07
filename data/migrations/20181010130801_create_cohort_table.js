// this is the reference for our students' table (cohort_id)
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    // set up an id that acts as the PK, and AI's
    tbl.increments();

    // set up a name column --> required, is text
    tbl.string('name', 128).notNullable();

    tbl.unique('name');
  });
};

exports.down = function(knex, Promise) {
  // drop the table
  return knex.schema.dropTableIfExists('cohorts');
};
