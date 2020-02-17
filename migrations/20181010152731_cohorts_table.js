
exports.up = function(knex, Promise) {
 return knex.schema.createTable('cohorts',function (table){
	table.increments('id');
	table.string('name',144)
	.notNullable()
	.inTable('cohorts');
 });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
