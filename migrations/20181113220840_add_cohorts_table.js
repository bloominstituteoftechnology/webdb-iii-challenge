exports.up = function(knex, Promise) {
	return new Promise((resolve, reject) => {
		resolve(
			knex.schema.createTable('cohorts', function(table) {
				table.increments('id')
				table.string('name').notNullable()
				table.timestamp('createdAt').defaultTo(knex.fn.now())
			}),
		),
			reject(e => console.log(e))
	})
}

exports.down = function(knex, Promise) {
	return new Promise((resolve, reject) => {
		resolve(knex.schema.dropTableIfExists('cohorts'))
		reject(e => console.log(e))
	})
}
