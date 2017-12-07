
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Users', tbl => {
        tbl.increments('id');
        tbl.string('name', 128).notNullable().unique('name','uq_users_name');
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Users');
};
