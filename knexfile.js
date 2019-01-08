module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/sqlite3.db'
      },
      useNullAsDefault: true,
      migrations: {
          directory: ''
        },
        seeds: {
          directory: ''
        }
    },
  };