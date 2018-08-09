
exports.up = function(knex, Promise) {
  return knex.schema.createTable(('users', function(tbl) {
      tbl.increments()

      tbl
      .string('name')
      .notNullable()
      .unique()
  }))
};

exports.down = function(knex, Promise) {
  
};
