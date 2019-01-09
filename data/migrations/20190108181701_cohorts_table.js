//equivalent to module.exports = {up, down}
//these functions run by knex

//modify database
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl){
    //primary key called id
    tbl.increments(); //by default creates id that auto-increments

    tbl.string('name', 255).notNullable();
  });
};

//revert/rollback changes to database (undo)
exports.down = function(knex, Promise) {
  //rollback
  return knex.schema.dropTableIfExists('cohorts');
};
