module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/db.sql'
      },
      useNullAsDefault: true,
      migrations: {
        directory: './data/migrations'
      },
      seeds: {
        directory: './data/seeds'
      }
    }
  };