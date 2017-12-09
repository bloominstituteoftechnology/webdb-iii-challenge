
exports.up = function(knex, Promise) {
  //id: Primary key, autoincrements
  // name: up to 128 charcters long, required
  //createdAt: defaults to the current date and time
  return knex.schema.createTable('Users', function(tb) {
    tb.increments('id');
    tb.string('name', 128).notNullable()
    tb.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Users');
};
