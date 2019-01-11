exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table => {
    table.increments();
    table.string('name').notNullable();
    table.integer('cohort_id').unsigned();
    table
      .foreign('cohort_id')
      .references('id')
      .on('cohorts');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
