
exports.up = function(knex, Promise) {
  return knex.schema.table('cohorts', tbl => {
    tbl.boolean('started').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('cohorts', tbl => {
    tbl.dropColumn('started');
  })
};
