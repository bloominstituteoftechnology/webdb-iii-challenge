exports.up = function(knex, Promise) {
return knex.schema.table('students', function(tbl){  
    tbl.string('testing');  
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.table('students', function(tbl){
        tbl.dropColumn('testing');
    });
};
  