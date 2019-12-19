
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cohorts',function(tbl){
        //primary key (Id)
        tbl.increments();

        //name
        tbl.string('name', 128).unique();

        tbl.timestamps(true,true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts')
};
