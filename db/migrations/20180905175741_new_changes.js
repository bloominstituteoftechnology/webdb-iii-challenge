
exports.up = function(knex, Promise) {
    return knex.schema.hasTable('students').then(function(exists) {
        if (exists) {
            return knex.schema.table('students', function(tbl) {
              tbl.dropColumn('cohort_name').alter('text')
            })
        }
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('students', function(tbl) {
        tbl.addColumn('cohort_name').alter('integer');
    });
  };
  