
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl) {
        tbl.increments();
        tbl.string('name', 255).notNullable();
        tbl.integer('cohort_id').notNullable().references('id').inTable('cohorts')
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};



// students
// id: primary key, autoincrements.
// name: text, required.
// cohort_id: references the id in the cohorts table.
