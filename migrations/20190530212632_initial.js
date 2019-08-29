exports.up = async knex => {
  await knex.schema.createTable("cohorts", tbl => {
    tbl.increments("id");
    tbl
      .string("name")
      .unique()
      .notNullable();
  });

  await knex.schema.createTable("students", tbl => {
    tbl.increments("id");
    tbl
      .string("name")
      .unique()
      .notNullable();
    tbl
      .integer("cohort_id")
      .references("id")
      .inTable("cohorts")
      .notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("students");
  await knex.schema.dropTableIfExists("cohorts");
};
