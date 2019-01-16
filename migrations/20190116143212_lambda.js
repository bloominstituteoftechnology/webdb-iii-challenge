
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    // primary key
    tbl.increments(); // defaults to a column named id

    // other fields
    tbl.string('name', 128);

    // timestamps
    tbl.timestamps(true, true);

  });

};

exports.down = function(knex, Promise) {
  
};
