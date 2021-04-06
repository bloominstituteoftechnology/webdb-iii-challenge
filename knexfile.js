// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda-rdbms-api-full.db'
    },
    migrations: {
      tableName: 'migrations'
    },
    useNullAsDefault: true
  }
};
