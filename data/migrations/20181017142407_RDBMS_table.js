
exports.up = function(knex, Promise) {
//these functions will be run by Knex, up = modify/update db changes
//we return with schema, which is just saying we want to build,
//creatTable() is a builtin method,
//we name our table to be an set up table to be aclled back later
  return knex.schema.createTable('rdbms', function(table) {
      //now we make the "fields" for the table aka columns
//make a primary key, usually id. also, side note table can be written as tbl
table.increments(); //by default creates an id field
//next field is name, not how after table we are specifying what kind of data will be in this
//field and in the case of increment, what we expect it to do.
//255 is max characters allowed, neato
table.string('name', 255).notNullable();
  });
}; 

exports.down = function(knex, Promise) {
 //down = redo/revert/undo db changes 
 //these are called rollbacks
 //if we don't want the above fields anymore, than this will run
 //and drop that field from, in our case, the table rdbms
return knex.schema.dropTableIfExists('rdbms');
}; 
