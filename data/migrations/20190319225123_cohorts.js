
exports.up = function(knex, Promise) {
  //define our cohorts table
  return knex.schema.createTable('cohorts', table => {
    table.increments();
    table.string('name', 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  // remove out cohorts table
  return knex.schema.dropTableIfExists('cohorts');
};
