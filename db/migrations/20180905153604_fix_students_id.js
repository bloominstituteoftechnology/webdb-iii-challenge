
exports.up = function(knex, Promise) {
  return knex.schema.hasTable('students').then(function(exists) {
      if (exists) {
          return knex.schema.table('students', function(tbl) {
            tbl.renameColumn('student_id', 'cohort_id')
          })
      }
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('students', function(tbl) {
      tbl.renameColumn('cohort_id', 'student_id');
  });
};
