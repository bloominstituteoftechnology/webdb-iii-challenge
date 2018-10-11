
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    // primary key called id
    tbl.increments(); // by default creates and id field

    tbl.string('name', 128).notNullable();

    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts');
  });
};

exports.down = function(knex, Promise) {
   // rollback
   return knex.schema.dropTableIfExists('students');
};
