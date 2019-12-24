
exports.up = function(knex, Promise) {
  return knex.schema.createTable('lambda', tbl => {
    //primary key
    tbl.increments(); //id that increments; pass a name if want anything diff than id

    //addtional fields
    tbl
      .string('name', 255) //pass name; length is an option, but not req
      .notNullable //is required

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('lambda');
};
