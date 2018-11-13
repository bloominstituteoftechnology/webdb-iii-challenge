// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/lambda.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds'
    }
  }
};

exports.up = function(knex, Promise) {
  knex.schema.createTable('cohorts', function(table) {
    table.increments();
    table
      .string('name', 128)
      .notNullable()
      .unique('name');
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('cohorts');
};

exports.up = function(knex, Promise) {
  knex.schema.createTable('students', function(table) {
    table.increments();
    table.string('name', 128);
    table
      .integer('course_id')
      .notNullable()
      .defaultTo(1);
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('students');
};
