
exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', table => {
    table.increments()
    table.string('comment_text').notNullable()
    table.timestamps(true, true)
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments')
};
