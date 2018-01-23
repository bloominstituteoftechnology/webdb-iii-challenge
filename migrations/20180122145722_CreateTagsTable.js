
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(tbl) {
      tbl.increments('id').primary();
      tbl.foreign(users).references('id');
  })
};

exports.down = function(knex, Promise) {
  
};
