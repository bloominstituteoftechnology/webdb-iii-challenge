module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/rdbms.db'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    }
  }
 };