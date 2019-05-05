
exports.up = function(knex, Promise) {
  return knex.schema.createTable
  ('students', table => {
      table.increments(); //ID
      table.string('name', 100).notNullable();
      //cohort_id: references the id in the cohorts table.
      table.integer('cohort_id').notNullable().references('id').inTable('cohorts')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
