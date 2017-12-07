// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/user.db'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'mysql',
    connection: {
      host:     'localhost',
      database: 'userdb',
      user:     'travis',
      password: 'password'
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
