module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/blogdb.sqlite3' }, // change this if you want a different name for the database
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost', // update this
      user: 'luis', // update this with the user you use to connect to MySQL
      password: 'pass', // update this with the password of the user you use to connect to MySQL
      database: 'blogdb', // if you want to use a different database change this name
    },
    pool: {
      min: 1,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './database/seeds' },
  },
};
