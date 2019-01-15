
exports.up = function(knex, Promise) {
 return knex.schema.createTable('students', table => {
  table.increments();
  
 })
};

exports.down = function(knex, Promise) {
  
};
