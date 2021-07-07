// Update with your config settings.

module.exports = {

  development:{
    client: 'sqlite3',
    connection: {
      filename: './data/lambda_sqlite3.db'
    },
    useNullAsDefault: true,
    migrations:{
      directory: './data/migrations'
    },
    seeds: {
    directory: './data/seeds'
    }
  },

};
