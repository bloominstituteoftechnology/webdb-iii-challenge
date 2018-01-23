// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite'
    },
    useNullAsDefault: true
  },

};
