exports.up = function(knex, Promise) {
    return knex.schema.hasTable('students').then(function(exists) {
        if (exists) {
            return knex.schema.table('students', function(tbl) {
              tbl.renameColumn('cohort_id', 'cohort_name')
            })
        }
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('students', function(tbl) {
        tbl.renameColumn('cohort_name', 'cohort_id');
    });
  };
  