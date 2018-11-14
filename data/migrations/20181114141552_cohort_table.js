exports.up = knex =>
  knex.schema.createTable("cohorts", tbl => {
    tbl.increments();
    tbl.string("name", 255);
  });

exports.down = knex => knex.schema.dropTableIfExists("cohorts");
