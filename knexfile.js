// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    // create the data folder manually
    connection: {
      filename: './data/rolex.db3', // the name for the database file to use, adjust as needed
    },
    migrations: {
      directory: './data/migrations', // the migrations folder is added to the root by default, this moves it to /data
    },
    seeds: {
      directory: './data/seeds', // the seeds folder is added to the root by default, this moves it to /data
    },
  },
};
