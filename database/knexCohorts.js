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
  return db("cohorts");
}
function findById(id) {
  return db("cohorts")
    .first()
    .where({ id });
}

function remove(id) {
  return db("cohorts")
    .where({ id })
    .del();
}

function add(cohort) {
  return db("cohorts").insert(cohort);
}

function update(id, changes) {
  return db("cohorts")
    .where({ id })
    .update(changes);
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
  find,
  findById,
  remove,
  add,
  update
};
