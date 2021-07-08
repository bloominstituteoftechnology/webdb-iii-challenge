
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(table) {
        table.increments()
        table.string('name', 150)
      })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts')
}