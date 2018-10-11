exports.up = function(knex, Promise) {
	return knex.schema.createTable("students", function(tbl) {
		tbl.increments("student_id");
		tbl.string("name", 255).notNullable();
		tbl
			.integer("cohort_id")
			.notNullable()
			.references("id")
			.inTable("cohorts")
			.onDelete("CASCADE");
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists("students");
};
