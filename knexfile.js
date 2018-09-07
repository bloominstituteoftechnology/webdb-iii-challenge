// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/lambda.sqlite3"
    },
    seeds: {
      directory: "./seeds/"
    },
    useNullAsDefault: true // new configuration for SQLite
  }
};
