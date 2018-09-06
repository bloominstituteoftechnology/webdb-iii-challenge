
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        tbl.increments('cohort_id');
        tbl.string('cohort_name', 256)//this creates a new column 
          .notNullable()
          .unique('uq_cohort_name')
    })
    
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts');
      
};
