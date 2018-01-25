exports.up = function (knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name', 128).notNullable().unique('name');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('posts', function (table) {
      table.increments();
      table.integer('userId')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users');
      table.text('text').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('tags', function (table) {
      table.increments();
      table.string('tag', 80).unique('tag').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('poststags', function (table) {
      table.increments();
      table.integer('postId').references('id').inTable('posts').unsigned().notNullable();
      table.integer('tagId').references('id').inTable('tags').unsigned().notNullable();
    }),
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('posts'),
    knex.schema.dropTableIfExists('tags'),
    knex.schema.dropTableIfExists('poststags')
  ])
};