// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/apifull.sqlite3'
    },
    useNullasDefault: true,
    seeds: { directory: './data/seeds' },
  },

};