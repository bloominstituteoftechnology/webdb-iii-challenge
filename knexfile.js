module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/lambda.sqlite3',
    },
    migrations: {
      directory: './database/migrations',
    },
    useNullAsDefault: true,
  },
};