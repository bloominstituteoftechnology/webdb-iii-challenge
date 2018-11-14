
exports.up = function (knex, Promise) {
    //implement the change we want in the db
    return knex.schema.createTable('students', function (tbl) {
        tbl.increments(); //generates primary key called id and auto increments

        tbl.string('name').notNullable(); // title 'name', non-null makes required

        tbl.integer('cohort_id').unsigned().references('id').inTable('cohorts');
    })
};

exports.down = function (knex, Promise) {
    // undo the changes made to db on knex:migrate rollback
    return knex.schema.dropTable('students');
};