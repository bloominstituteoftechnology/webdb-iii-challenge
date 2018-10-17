//in here we have requested to the terminal that we want to change the field 'name'
//so we typed 'knew migrate:make rename_RDBMS_name' and it created this new migration
//file for us.
//Here we will bring in a refernce to the original migraiton and manipulate it
//let's see what happens lol

exports.up = function(knex, Promise) {
    //note we are not wrting creatTable(), but instead just table()
    return knex.schema.table('rdbms', function(rdbms) {
        //renameColumn is a built in method, then ('old name', 'new name')
        rdbms.renameColumn('name', 'firstName');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('rdbms', function(rdbms) {
        //down here we want to create out Undo button, so it will be the opposite
        //of the above
        rdbms.renameColumn('firstName', 'name');
    });
};
 