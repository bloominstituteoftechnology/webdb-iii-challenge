
exports.up = function(knex, Promise) {
    return knex.schema.createTable("students", function(table) {
        table.increments(); 
        table
          .string("student_name", 128)
          .notNullable()
          .unique("student_name");
        table.integer('cohort_id').unsigned().notNullable().references('id').inTable('cohorts')
      }); 
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("students");
};
