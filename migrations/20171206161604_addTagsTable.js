
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Tags', tbl => {
        tbl.increments('id');
        tbl.string('tag', 16).notNullable().unique('tag','uq_Tags_tag');
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      });  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Tags');
};
