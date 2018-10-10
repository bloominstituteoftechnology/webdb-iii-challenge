
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', (t) => {
    t.increments();
    t.string('name', 33).notNullable()
    t.unique('name');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
