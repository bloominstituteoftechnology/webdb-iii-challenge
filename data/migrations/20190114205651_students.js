exports.up = function(knex, Promise) { //make changes
  return knex.schema.createTable('students', table => {
    table.increments() //autoincrement
    table.integer('count').notNullable() //integer and not null
  })
}

exports.down = function(knex, Promise) { //code that undos the changes
   return knex.schema.dropTableIfExists('students')
}
