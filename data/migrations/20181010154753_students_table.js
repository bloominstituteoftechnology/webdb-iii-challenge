// Latest table schema
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', tbl => {
        tbl.increments(); // Primary ID, Auto Increments
        tbl.string('name', 255).notNullable(); // Name field, required
        tbl.integer('cohort_id').unsigned().references('id').inTable('tracks'); // Foreign key of the 'cohorts table ID'
    })
  };
  
  // Rollback to previous table schema
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students'); // Remove table
  };
  