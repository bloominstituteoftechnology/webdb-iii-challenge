
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(tbl) {
     tbl.increments();
     tbl
        .string('name')
        .notNullable()
        .defaultTo('not provided')
        
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students');
};
