
exports.up = function(knex, Promise) {
  return knex.schema.table('students', tbl => {
    tbl.renameColumn('student_id', 'cohort_id')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('students', tbl => {
        tbl.renameColumn('cohort_id', 'student_id')
      })
};
