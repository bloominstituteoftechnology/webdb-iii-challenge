// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/lambda.slqlite3"
    },
    seeds: {
      directory: "./seeds/"
    },
    useNullAsDefault: true
  }
};
