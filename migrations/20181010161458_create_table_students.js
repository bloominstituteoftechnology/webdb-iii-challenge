exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", t => {
    t.increments();
    t.string("name", 33);
    t.integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {};
