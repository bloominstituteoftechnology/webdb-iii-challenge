
exports.up = function (knex, Promise) {
    return knex.schema.createTable('posts', tbl => {

        //  primary key
        tbl.increments();

        // foreign key: userId
        tbl
            .integer('userId')
            .notNullable()
            .references('id')
            .inTable('users');
            // .unsigned()  not required for sqlite3, but noted here because it can be required in other DMBSs
            
            

        // text field
        tbl
            .string('text') //Q: Assignment says that there shouldn't be a size limit on the text. The default limit when it's not entered is 256 characters. Should I just enter a large number here? Like what?
            .notNullable(); 

        // //createdAt field
        tbl 
            .timestamp('createdAt')
            .defaultTo(knex.fn.now());

        
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
