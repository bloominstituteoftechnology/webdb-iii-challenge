
exports.up = function(knex, Promise) {
  /*
        here we can implement the changes we want in our database:
        in general refer to the schema building section of the knex docs:
        notice this is the exports **UP** portion not **DOWN**
        https://knexjs.org/#Schema
  */
  return knex.schema.createTable('cohorts', function(table) {
    //to generate a primary id key and auto increment per object passed into db
    //you can pass a string to rename it as anything other than id, id is default
    table.increments()
    //string value for name, making it required, not provided upon default and 128 character limit because whynot.
    table
    .string('name', 128)
    .notNullable()
    .defaultTo('not provided')
  })
};

exports.down = function(knex, Promise) {
  //here we can undo the changes so we can clean up after ourselves according to Luis:
  return knex.schema.dropTable('courses');
};
