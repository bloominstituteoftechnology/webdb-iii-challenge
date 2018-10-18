
exports.up = function(knex, Promise) {
   return knex.schema.createTable('students', function(table) {
        table.increments();
        table.string('name', 128).notNullable(); 
        table.string('cohort_id');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
