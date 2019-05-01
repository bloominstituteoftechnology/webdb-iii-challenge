
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', function(tbl){
        tbl.increments();

        tbl.string('name', 128).notNullable()

        tbl.integer('cohorts_id').unsigned().references('cohorts.id').onDelete('CASCADE').onUpdate('CASCADE')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students')
};
