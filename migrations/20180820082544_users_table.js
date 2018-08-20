
exports.up = function(knex, Promise) {
  // create the users tables
  return knex.schema.createTable('users', function(tbl) {
    // primary key
    tbl.increments(); // creates an id (if you don't pass anything here the default name of the column will be 'id'), makes it integer, makes it autoincrement

    // other fields

    //name field
    tbl
        .string('name', 128)
        .notNullable();
        // .defaultTo('Not Prodivided');

    //createdAt field
    tbl
        .integer('createdAt')
        //.defaultTo('Current date and time')
        //.defaultTo(Date.getFullYear(), Date.getMonth(), Date.getDate(), Date.getHours(), Date.getMinutes(), Date.getSeconds() )
        .defaultTo(20180820102544);
  })
};

exports.down = function(knex, Promise) {
 // drop the users table
 return knex.schema.dropTableIfExists('users');
};
