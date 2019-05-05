module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './src/lambda.sqlite3' },
    useNullAsDefault: true,
    migrations: {
      directory: './src/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './src/seeds' },
  },
};