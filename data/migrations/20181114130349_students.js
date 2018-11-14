
exports.up = function(knex, Promise) {
  
return knex.schema.createTable('students', function(tbl){
    tbl.increments();
    tbl.string('name', 255);
    tbl.string('cohort_id', 128);
})

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
