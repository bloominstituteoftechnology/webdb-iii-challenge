
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl){
    tbl.increments();
    tbl.string('name').unique()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students ')
};
