// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/user.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds/dev'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'mysql',
    connection: {
      database: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds/dev'
    },
  }

};
