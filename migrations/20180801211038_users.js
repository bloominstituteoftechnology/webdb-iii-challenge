
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name', 128).notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
