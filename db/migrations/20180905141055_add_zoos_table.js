
exports.up = function(knex, Promise) {
  return knex.schema.createTable('zoos', function(tbl) {
      tbl.increments('table_id');
      tbl.string('name', 256)//this creates a new column 
        .notNullable()
        .unique('uq_zoo_name')
      tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('zoos');
};
