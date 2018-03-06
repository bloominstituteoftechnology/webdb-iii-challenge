// Update with your config settings.



module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'users_db',
      user: 'root',
      password: '',
    }
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './database/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './database/seeds',
  }
};