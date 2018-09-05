// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/CS12.sqlite3'
    },
    migrations: {
      directory: './db/migrations'
    }, 
    seeds: {
      directory: './db/seeds'
    }
  },
};
