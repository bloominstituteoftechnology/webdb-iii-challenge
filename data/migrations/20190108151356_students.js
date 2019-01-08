
exports.up = function(knex, Promise) {
  // Change wanted to make
  return knex.schema.createTable('students', table => {
    table.increments();
    table.string('name').notNullable();
    table.integer('cohort_id').unsigned().references('id').inTable('cohorts');
  });

};

exports.down = function(knex, Promise) {
  // Undo previous change
  return knex.schema.dropTableIfExists('students');
};
