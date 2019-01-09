
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', table=> {
    // we must use the callback syntax for .createTable()
    table.increments(); // pass the name if you wanted to be called anything other than id
    table
      .string('name', 100).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};


