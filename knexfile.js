// Update with your config settings.
const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true, //need for sqlite
    connection: {
      filename: "./data/db.sqlite3"
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },
  production: {
    client: "pg",
    connection:
      "postgres://kenxavkrkpudxr:e9e0cb54ec93dc263c9a84424913e39bba9894f056fecac921cd3a89c084c384@ec2-54-204-41-109.compute-1.amazonaws.com:5432/deo2lfu8dhnd17",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    }
  }
};
