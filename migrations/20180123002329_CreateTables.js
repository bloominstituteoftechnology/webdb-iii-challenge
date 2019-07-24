
exports.up = function(knex, Promise) {
  
  return Promise.all([

    knex.schema.createTableIfNotExists('Users', (table) => {

      table.increments().primary();
      table.string('name', 128).notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());

    }),

    knex.schema.createTableIfNotExists('Posts', (table) => {

      table.increments().primary();
      table.integer('userId').references('id').inTable('Users');
      table.string('text').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());

    }),

    knex.schema.createTableIfNotExists('Tags', (table) => {

      table.increments().primary();
      table.string('tag', 16).unique('tag');
      table.timestamp('createdAt').defaultTo(knex.fn.now());

    }),

    knex.schema.createTableIfNotExists('Posts_Tags', (table) => {

      table.increments().primary();
      table.integer('postId').references('id').inTable('Posts');
      table.integer('tagId').references('id').inTable('Tags');
      table.timestamp('createdAt').defaultTo(knex.fn.now());

    }),

  ]);

};

exports.down = function(knex, Promise) {
  
  return knex.schema.dropTableIfExists('Users');

};
