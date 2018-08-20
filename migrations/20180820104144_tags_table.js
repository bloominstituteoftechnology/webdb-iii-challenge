
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', tbl => {

        //  primary key
        tbl.increments();

        // tag field
        tbl
            .string('tag', 16) 
            .notNullable()
            .unique(); //NOTE: NOTE SHOWING UNIQUE IN DB BROWSER! FIX!

        //createdAt field
        tbl
            .integer('createdAt')
            //.defaultTo('Current date and time')
            //.defaultTo(Date.getFullYear(), Date.getMonth(), Date.getDate(), Date.getHours(), Date.getMinutes(), Date.getSeconds() )
            .defaultTo(20180820102544);

        
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tags');
};
