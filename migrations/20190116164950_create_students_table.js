
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', (tbl) => {
      tbl.increments();
      tbl.string('name', 128);
      tbl.integer('cohort_id').unsigned().references('cohorts.id');
      tbl.unique('name', 'uq_students_name')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students')
}