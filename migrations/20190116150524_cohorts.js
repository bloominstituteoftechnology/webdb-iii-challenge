
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {

    tbl.increments();
    
    tbl.string('name', 128);

    tbl.unique('name', 'uq_cohorts_name');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts', tbl => {
      tbl.dropUnique('uq_cohorts_name');
  })
};
