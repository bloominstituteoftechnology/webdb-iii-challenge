exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', table => {
    table.increments()
    table.string('name', 128)
    table
      .integer('student_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
    table.timestamps(true, true)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
}
