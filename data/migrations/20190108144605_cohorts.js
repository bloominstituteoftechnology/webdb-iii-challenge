
exports.up = function(knex, Promise) {
  // Change wanted to make
  return knex.schema.createTable('cohorts', table => {
    table.increments();
    table.string('name').notNullable();
  });

};

exports.down = function(knex, Promise) {
  // Undo previous change
  return knex.schema.dropTableIfExists('cohorts');
};
