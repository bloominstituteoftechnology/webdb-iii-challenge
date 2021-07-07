
exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", function(tbl) {
        // .increments() generates a primary key and makes it autoincrement
        tbl.increments();
        tbl
          .string("studentName", 80)
          .notNullable()
          .unique("studentName");
        tbl.integer('cohort_id');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("students");
};
