exports.up = function(knex, Promise) {
  // implement the change we want in our db
  return knex.schema.createTable("students", function(tbl) {
    tbl.increments(); // generates a primary key called id and makes it autoincrement
    tbl
      .string("name", 128)
      .notNullable()
      .unique("uq_student_name");
    tbl
      .integer('cohort_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cohorts');

    // tbl.foreign("cohort_id").reference("id");
  });
};

exports.down = function(knex, Promise) {
  // we undo the changes made to the db // rollback
  return knex.schema.dropTable("students");
};
