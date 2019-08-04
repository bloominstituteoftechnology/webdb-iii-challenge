// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    seeds: {
      directory: './seeds/'
    },
    useNullAsDefault: true,
  }
};
