
exports.up = function(knex, Promise) {
    return knex.schema.table('cohorts', function(tbl){
        tbl.boolean('started').defaultTo(true);
      //   tbl.renameColumn('started', 'finish') how to rename a column
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('cohorts').dropColumn('started');
  };
  