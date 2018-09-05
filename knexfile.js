// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/dev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      // add this line
      directory: "./data/migrations"
    },
    seeds: {
      // add this line
      directory: "./data/seeds"
    }
  }
};
