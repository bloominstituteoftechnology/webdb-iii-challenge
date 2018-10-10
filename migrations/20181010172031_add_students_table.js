exports.up = function (knex, Promise) {
  return knex.schema.createTable('students', function (tbl) {
    tbl.increments('Id');
    tbl
      .integer('student_id')
      .notNullable()
      .references('id')
      .inTable('students');
    tbl.string('name', 80).notNullable();
    tbl.string('cohort_id', 80).notNullable().references('id');
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};