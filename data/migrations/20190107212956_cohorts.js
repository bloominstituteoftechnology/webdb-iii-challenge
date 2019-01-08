
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', table => {
      table.increments();
      table.integer('name').notNullable();
  } )
};

exports.down = function(knex, Promise) {
  
};
