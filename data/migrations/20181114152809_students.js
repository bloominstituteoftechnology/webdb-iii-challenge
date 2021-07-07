exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
    // primary key
    tbl.increments();
    // name field - required
    tbl.string('name', 255).notNullable();
    // Cohort ID
    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts');
    // Timestamp
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {};
