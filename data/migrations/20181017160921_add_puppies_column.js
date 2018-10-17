//here we are just being silly, but we are adding an eniterly new column
//called puppies! 
exports.up = function(knex, Promise) {
    return knex.schema.table('rdbms', rdbms => {
        //here we are setting the data type we expect
        //for puppies to be a boolean, true or false
        //defaultTo(0) is a built in method that sets
        //it to false to start, fyi (1 = true)
        rdbms.boolean('puppies').defaultTo(0);
    });
};
//here we are making our undo button
exports.down = function(knex, Promise) {
    return knex.schema.table('rdbms', rdbms => {
        //dropColumn is a built in, I suggest looking at the list
        //of pre-mades to see what else we can do
        rdbms.dropColumn('puppies');
    })
};
