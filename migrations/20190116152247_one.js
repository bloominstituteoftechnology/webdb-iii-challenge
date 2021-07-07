
exports.up = function(knex, Promise) {
  //makes changes to our database
  //creating table
  return knex.schema.createTable('cohorts', function(tbl){
      //primary key
    tbl.increments('id');

      //other fields
    tbl.string('name', 128);
    
      //constraints

    tbl.unique('name', 'uq_cohorts_name');

      //timestamps
      tbl.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
    //rollback/undo
    return knex.schema.dropTableIfExists('cohorts')
  
};

tbl.integer('cohort_id').unsigned().references('cohorts.id');