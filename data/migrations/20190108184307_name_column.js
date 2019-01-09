
exports.up = function(knex, Promise) {
  return knex.schema.table('cohorts', table => {
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('cohorts', table => {
      table.dropColumn('name');
  })
};
