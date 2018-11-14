exports.up = knex =>
  knex.schema.createTable("students", tbl => {
    tbl.increments();

    tbl.string("name", 255);

    tbl
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
  });

exports.down = knex => knex.schema.dropTableIfExists("students");
