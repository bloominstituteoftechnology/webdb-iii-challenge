
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
    //primarykey
    tbl.increments();

    //fields
    tbl.string('name', 128)
    .notNullable();

    tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');  
};
