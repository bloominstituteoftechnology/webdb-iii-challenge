const knex = require('../db');

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments();
    tbl.string('name', 128).notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};