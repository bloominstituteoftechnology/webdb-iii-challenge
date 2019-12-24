
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
      tbl.increments(); 
      tbl.string('name').notNullible(); 
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
