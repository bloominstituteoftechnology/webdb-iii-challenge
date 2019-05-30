exports.up = async function(knex) {
	await knex.schema.createTable('cohorts', (tbl) => {
		tbl.increments('id');
		tbl.string('name', 128);
	});

	await knex.schema.createTable('students', (tbl) => {
		tbl.increments('id');

		tbl.string('name', 128).notNullable().unique();
		tbl.integer('cohort_id').references('id').inTable('cohorts').onDelete('CASCADE').onUpdate('CASCADE');
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('cohorts');
	await knex.schema.dropTableIfExists('students');
};
