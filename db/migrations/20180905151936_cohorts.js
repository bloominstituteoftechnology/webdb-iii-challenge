exports.up = function(knex, Promise) {

    return knex.schema.createTable('cohorts', function(session){
        session
        .increments()
        .string('name', 255)
        .unique('name');  
        
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cohorts')
};
