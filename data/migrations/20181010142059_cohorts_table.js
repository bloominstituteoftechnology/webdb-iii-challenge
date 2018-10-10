
exports.up = function(knex, Promise) {


  return knex.schema.createTable('cohorts', function(tbl){
      // primary key called id
      tbl.increments();

      tbl.string('name', 255).notNullable();
      
      tbl.integer('student_id')
      .unsigned()
      .references('id')
      .inTable('students');
      
  })


};


exports.down = function(knex, Promise) {
    //rollback
  
 return knex.chema.dropTableifExists('cohorts');

};
