
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', tbl => {
      //Creates PK that auto-increments
      tbl.increments('id');

      //Creates name field
      tbl.string('name', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
    //Rolls back the table created
  return knex.schema.dropTableIfExists('cohorts');
};
