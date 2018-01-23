const knex = require('../db');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', (tbl) => {
    tbl.increments();
    tbl.integer('userId').references('id').inTable('users').notNullable();
    tbl.string('text').notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts');
};
