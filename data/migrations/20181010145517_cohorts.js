
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts', function(tbl) {
	// primary key called id
	tbl.increments(); // created id field that autoincrements by default
	tbl.string('name', 255).notNullable();
	tbl.unique('name');
    });
};

exports.down = function(knex, Promise) {
    //rollback
    return knex.schema.dropTableIfExists('cohorts');
};
