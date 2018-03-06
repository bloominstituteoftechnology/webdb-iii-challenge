exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments();   // id, primary key

    tbl
      .string('name', 128)  // name
      .notNullable();

    tbl.timestamps();  // created at
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
