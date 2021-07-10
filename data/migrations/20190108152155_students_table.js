
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students',
    table => {
        table.increments();                             //id: primary key, auto-increments
        table.string('name').notNullable();             //name: text, required
        table.integer('cohort_id').unsigned()
        .references('id').inTable('cohorts');           //cohort_id: references id in cohorts table  
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
