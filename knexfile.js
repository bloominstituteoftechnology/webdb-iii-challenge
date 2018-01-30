module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/blogdb.sqlite3' }, // change this if you want a different name for the database
    useNullAsDefault: true, // used to avoid warning on console
    migrations: {
      directory: './migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './seeds' },
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost', // update this
      user: 'root', // update this with the user you use to connect to MySQL
      password: 'sarika1234', // update this with the password of the user you use to connect to MySQL
      database: 'blogdb', // if you want to use a different database change this name
    },
    pool: {
      min: 1,
      max: 10,
    },
    migrations: {
      directory: './migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './seeds' },
  },
};