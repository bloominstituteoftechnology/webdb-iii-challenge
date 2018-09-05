
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
        tbl.increments();
        tbl.text('name')
            .notNullable()
            .unique('name');
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cohorts');
};
