
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
    // primary key
    tbl.increments(); // defaults to a column named id

    // other fields
    tbl.string('name', 128);

    //foreign key
    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts');

    // timestamps
    tbl.timestamps(true, true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bears');
};
