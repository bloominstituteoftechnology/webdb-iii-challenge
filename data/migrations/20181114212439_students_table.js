
exports.up = function (knex, Promise) {
    //makes changes to the database
    return knex.schema.createTable('students', function (tbl) {

        //primary key
        tbl.increments()

        tbl
            .string('name', 120)
            .notNullable();
        tbl
            .integer('cohort_id')
            .notNullable();
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
