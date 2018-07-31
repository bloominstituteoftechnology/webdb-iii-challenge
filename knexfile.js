// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/cs11.sqlite3',
    },
    useNullAsDefault: true,
  },
};
