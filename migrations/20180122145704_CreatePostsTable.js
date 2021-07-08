
exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(tbl) {
      tbl.increments('id')
      tbl.foreign(users).references('id')

      tbl
      .text('posts')
      tbl.timestamp('created_at').default(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  
};
