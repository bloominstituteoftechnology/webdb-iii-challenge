
exports.up = function(knex, Promise) {
 return knex.schema,createTable('cohorts', table => {
   table.increments();

  })
};

exports.down = function(knex, Promise) {
 knex.schema.dropTable()
};
