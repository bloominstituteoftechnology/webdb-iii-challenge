const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3"
  },
  useNullAsDefault: true
};
const db = knex(config);

function find() {
  return db("students");
}

async function execute() {
  try {
    const cohorts = await find();
    console.log(cohorts);
  } catch (err) {
    console.log(err);
  }
}

execute();
module.exports = {
  find
};
