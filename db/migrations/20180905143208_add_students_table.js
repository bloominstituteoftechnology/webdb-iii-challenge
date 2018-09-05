
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments();
        tbl
           .string('student_name', 256)//this creates a new column 
           .notNullable();
        tbl
            .integer('student_id')
            .unsigned()
            .notNullable()
            .references('cohort_id')
            .inTable('courses');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');

};
