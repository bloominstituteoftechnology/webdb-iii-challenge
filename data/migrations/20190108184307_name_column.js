
exports.up = function(knex, Promise) {
  return knex.schema.table('cohorts', table => {
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('cohorts', table => {
      table.dropColumn('name');
  })
};
