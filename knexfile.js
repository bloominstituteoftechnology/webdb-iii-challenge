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

  production: {
    client: "pg",
    connection:
      "postgres://ubtexdneygyrvq:f9f20c6b39c47ffbd56843c59eab405b7cd4455cf3fe9812d0f96670ce34bc9a@ec2-54-83-44-4.compute-1.amazonaws.com:5432/d56idbg6ltrqcr",
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
