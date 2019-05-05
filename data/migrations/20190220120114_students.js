exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", tbl => {
    tbl.increments(); // - `id`: primary key, auto-increments.
    tbl.string("name").notNullable(); // - `name`: text, required.
    tbl
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts")
      .onDelete("CASCADE") //----> if you delete one it will delete related cohort_id
      .onUpdate("CASCADE"); // - `cohort_id`: references the `id` in the cohorts table.
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
