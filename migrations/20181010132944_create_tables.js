
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', table => {
      table.increments();
      table.string('name').notNullable()
      table.unique('name')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cohorts')
};
