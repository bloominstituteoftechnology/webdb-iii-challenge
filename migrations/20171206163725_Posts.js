
exports.up = function(knex, Promise) {
  //id: primar key, autoincrements
  //userId: refernces the id in the users table
  // text: not size limit, required
  //createdAt: defaults to the current date and time
  return knex.schema.createTable('Posts', function(tb) {
    tb.increments('id');
    tb.integer('userId')
      .notNullable()
      .references('id')
      .inTable('Users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tb.text('text').notNullable();
    tb.timestamp('createdAt').default(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Posts');
};
