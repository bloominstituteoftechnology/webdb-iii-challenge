
exports.up = function(knex, Promise) {
 return knex.schema.createTable('students', table => {
  table.increments();
  table.string('name')
   .notNullable()
  table.string('track')
  table
   .integer('cohort_id')
   .unsigned()
   .references('id')
   .inTable('cohorts')
 })
};

exports.down = function(knex, Promise) {
 return knex.schema.dropTableIfExists('students')
};
