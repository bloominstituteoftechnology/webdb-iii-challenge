module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './data/lambda.sqlite3.db'
      },
      useNullAsDefault: true,
      migrations: {
          directory: './data/migrations'
        },
        seeds: {
        directory: ''
        }
    },
  };