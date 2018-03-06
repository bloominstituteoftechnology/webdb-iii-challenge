// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: 'RDBMS',
      user: 'root',
      password: 'root',
      host: 'localhost'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds:  {
      directory: './database/seeds'
    }
  }
};
