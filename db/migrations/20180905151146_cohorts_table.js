
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        // generates a primary key called id and makes it auto-increment
        tbl.increments();
    
        tbl
          .string('name', 128)
          .notNullable()
          .unique('name');
        //.defaultTo('not provided')
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cohorts');
};
