
exports.up = function(knex, Promise) {
  //makes changes to our database
  //creating table
  return knex.schema.createTable('cohorts', function(tbl){
      //primary key
    tbl.increments()

      //other fields
    tbl.string('name', 128)

      //constraints

    tbl.unique('name', 'uq_name')

      //timestamps
      tbl.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  
};
