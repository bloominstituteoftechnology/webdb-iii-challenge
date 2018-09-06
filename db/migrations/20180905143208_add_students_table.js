
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments();
        tbl
           .string('student_name', 256)//this creates a new column 
           .notNullable();
        tbl
            .string('cohort_name')
            .notNullable()
            .references('cohort_id')
            .inTable('courses');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');

};
