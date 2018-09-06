exports.up = function(knex, Promise) {
    return knex.schema.hasTable('cohorts').then(function(exists) {
        if (exists) {
            return knex.schema.table('cohorts', function(tbl) {
              tbl.renameColumn('name', 'cohort_name')
            })
        }
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('cohorts', function(tbl) {
        tbl.renameColumn('cohort_name', 'name');
    });
  };
  
