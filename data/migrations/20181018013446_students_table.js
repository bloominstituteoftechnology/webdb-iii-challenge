
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {

    //Creates PK with auto-increments
      tbl.increments('id');

      //Creates name field
      tbl.string('name', 255).notNullable();

      //Creates refrence id
      tbl.integer('cohort_id')
        .unsigned()
            .references('id')
                .inTable('cohorts');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
