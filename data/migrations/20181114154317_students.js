
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl){
        tbl.increments();
        tbl.string('name', 255);
        tbl.integer('student_id').unsigned().references('id').inTable('students');
    })
};

exports.down = function(knex, Promise) {
  
};
