exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(session){
        session
            .increment(); 
        session
            .string('name')
            .unique('uq-student-name'); 
        session
            .integer('cohort_id')
            .refrences('id')
            .inTable('cohorts')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students'); 
};
