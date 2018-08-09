exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (tbl) => {
    tbl.increments();

    tbl
      .string('post')
      .notNullable()
      .unique();
    // creates a foreign key from one table to another
    tbl
      .integer('userId')
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex, Promise) {};
