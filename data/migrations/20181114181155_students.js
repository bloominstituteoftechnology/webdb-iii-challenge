exports.up = function (knex, Promise) {
    return knex.schema.createTable('students', tbl => {
        tbl.increments()
        tbl.string('name', 255)
        tbl
            .integer('student_id')
            .unsigned()
            .references('id')
            .inTable('cohorts')
        tbl.timestamps(true, true)
    })
};


exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists("students");
};

