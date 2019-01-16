
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', table => {
        table.increments('id')
        table.string('name').notNullable()
        table.
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
