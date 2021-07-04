exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', (tableObject) => {
      tableObject.increments();
      tableObject.string('name', 256).notNullable();
      tableObject
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts');

    })
  };

  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
