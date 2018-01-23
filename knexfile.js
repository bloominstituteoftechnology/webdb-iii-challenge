// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/blog.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'blogdb',
      user:     'jason',
      password: 'pass'
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'dbmigrations'
    },
    seeds: {
      directory: './database/seeds',
    },
  }

};

