exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", tbl => {
    tbl.increments(); //primary and auto increement (id)
    tbl.string("name").notNullable();
  });

  /*
- `id`: primary key, auto-increments.
- `name`: text, required.
*/
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
