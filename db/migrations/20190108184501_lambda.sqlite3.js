
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', table
  => {
      table.increments('id');
      table.string('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};

// cohorts
// id: primary key, auto-increments.
// name: text, required.
// students
// id: primary key, auto-increments.
// name: text, required.
// cohort_id: references the id in the cohorts table.