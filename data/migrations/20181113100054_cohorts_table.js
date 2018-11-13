
exports.up = function(knex, Promise) {
      // implements the change we want in database
    return knex.schema.createTable('cohorts', function(tbl) {
        tbl.increments(); // now we have ID field that auto-increments 

        tbl
        .string('name', 150)
        .notNullable(); // ddds a not null on the current column being created.
    });
  
};

exports.down = function(knex, Promise) {
    // rollback
    return knex.schema.dropTableIfExists('cohorts'); 
};
