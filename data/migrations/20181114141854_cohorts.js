
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
      tbl.increments();
      tbl.string('name', 255)
      
      tbl.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExits('cohorts')
};
