exports.up = async function(knex) {
	await knex.schema.createTable('cohorts', (tbl) => {
		tbl.increments('id');
		tbl.string('name', 128);
	});

	await knex.schema.createTable('students', (tbl) => {
		tbl.increments('id');

		tbl.string('name', 128).notNullable().unique();
		tbl.integer('cohort_id').references('name').inTable('cohorts').onDelete('CASCADE').onUpdate('CASCADE');
	});

	await knex.schema.table('students', (tbl) => {
		tbl.renameColumn('cohort_id', 'cohort');
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('cohorts');
	await knex.schema.dropTableIfExists('students');
};
