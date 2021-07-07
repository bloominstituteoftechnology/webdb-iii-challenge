exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", students => {
    students.increments();
    students.string("name", 255).notNullable();
    students
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students")
};
