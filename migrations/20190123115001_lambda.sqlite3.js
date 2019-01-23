exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    tbl.increments();


    tbl.string('name', 255)


    tbl.timestamps(true, true);

    //tbl.unique('name', 'uq_items_name');
  });
};

exports.down = function(knex, Promise) {};
