
exports.up = function(knex, Promise) {
    return knex.schema.createTable('posts', function(tbl) {
        tbl.increments()
  
        tbl
        .string('post')
        .notNullable()
        .unique()
        
        tbl
        .integer('userId')
        .references('id')
        .inTable('users')
    })
};

exports.down = function(knex, Promise) {
  
};
