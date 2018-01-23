exports.up = function (knex, Promise) {
  return Promise.all([

    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('name', 128).notNullable().unique('name', 'uq_users_name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('posts', function (table) {
      table.increments();
      table.integer('userId')
        .references('id')
        .inTable('users');
      table.string('text').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('tags', function (table) {
      table.increments('id');
      table.string('tag', 16).unique('tag', 'uq_tags_name');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),

    knex.schema.createTable('posts_tags', function(table){
      table.increments('id');
      table.integer('post_id').references('posts.id');
      table.integer('tag_id').references('tags.id');
    }),
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('posts'),
    knex.schema.dropTableIfExists('tags'),
    knex.schema.dropTableIfExists('posts_tags')
  ])
};