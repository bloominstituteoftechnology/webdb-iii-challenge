// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/posts.sqlite3'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'mysql',
    connection: {
      host:'localhost',
      database: 'RDBMSfull',
      user:     'jaspinder',
      password: 'pass'
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
