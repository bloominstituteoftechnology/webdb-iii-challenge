exports.up = function(knex, Promise) {
	return new Promise((resolve, reject) => {
		resolve(
			knex.schema.createTable('students', function(table) {
				table.increments('id')
				table.string('name').notNullable()
				table.integer('cohort_id').references('cohorts.id')
				table.timestamp('createdAt').defaultTo(knex.fn.now())
			}),
		),
			reject(e => console.log(e))
	})
}
 exports.down = function(knex, Promise) {
	return new Promise((resolve, reject) => {
		resolve(knex.schema.dropTableIfExists('students'))
		reject(e => console.log(e))
	})
}