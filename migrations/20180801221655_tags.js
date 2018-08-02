
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tags', table => {
    table.increments()
    table.string('tag', 16).unique('tag').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('tags')
}
