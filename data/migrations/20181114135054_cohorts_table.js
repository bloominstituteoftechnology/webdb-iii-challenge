exports.up = function(knex, Promise) {
  //create table
  return knex.schema.createTable("cohorts", tbl => {
    // set primary key field of id
    tbl.increments();
    //other fields
    tbl.string("name", 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
