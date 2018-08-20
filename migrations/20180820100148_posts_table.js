
exports.up = function (knex, Promise) {
    return knex.schema.createTable('posts', tbl => {

        //  primary key
        tbl.increment();

        // foreign key: userId
        tbl
            .integer('userId')
            // .unsigned()  not required for sqlite3, but noted here because it can be required in other DMBSs
            .references('id')
            .inTable('users');

        // text field
        tbl
            .string('text') //Q: Assignment says that there shouldn't be a size limit on the text. The default limit when it's not entered is 256 characters. Should I just enter a large number here? Like what?
            .notNullable(); 

        //createdAt field
        tbl
            .integer('createdAt')
            //.defaultTo('Current date and time')
            //.defaultTo(Date.getFullYear(), Date.getMonth(), Date.getDate(), Date.getHours(), Date.getMinutes(), Date.getSeconds() )
            .defaultTo(20180820102544);

        
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
