/* 
add mysql credentials on lines 16 and 17
and
change file name to:
knexfile.js
*/

// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      database: 'rdbms-api-full_db',
      user: 'USER_HERE',
      password: 'PASSWORD_HERE',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './databse/seeds',
    },
  },
};
