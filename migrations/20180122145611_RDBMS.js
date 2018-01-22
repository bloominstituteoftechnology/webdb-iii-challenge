exports.up = function (knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', (tbl) => {
            tbl.increments('id');
            tbl.string('name', 128).notNullable();
            tbl.timestamp('createdAt').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('posts', (tbl) => {
            tbl.increments('id');
            tbl.integer('userId').notNullable();
            tbl.string('text');
            tbl.timestamp('createdAt').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('tags', (tbl) => {
            tbl.increments('id');
            tbl.string('tag', 16).unique('tag', 'uq_tag_name');
            tbl.timestamp('createdAt').defaultTo(knex.fn.now());
        })
      };

exports.down = function (knex, Promise) {

};