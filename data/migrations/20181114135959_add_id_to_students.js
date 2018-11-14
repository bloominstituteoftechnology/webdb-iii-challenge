
exports.up = function(knex, Promise) {
  return knex.schema.table('students', table => {
    table.increments('id')
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.table('students', table => {
    table.dropColumn('id')
  })
  
};
