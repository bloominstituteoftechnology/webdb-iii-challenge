const knex = require('knex');
const config = require('./../../knexfile');
const db = knex(config.development);

module.exports = {
  find,
  findById,
  add,
  remove,
  update,
  findCohortStudent,
  findMessageById,
  addMessage,
};

function find(query) {
  const { page = 1, limit = 5, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('cohorts')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}

function findById(id) {
  return db('cohorts')
    .where({ id })
    .first();
}

async function add(cohort) {
  const [id] = await db('cohorts').insert(cohort);

  return findById(id);
}

function remove(id) {
  return db('cohorts')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('cohorts')
    .where({ id })
    .update(changes, '*');
}

function findCohortStudent(cohortId) {
  return db('students')
    .join('cohorts', 'students.cohort_id', 'cohorts.id')
    .select('students.Id', 'students.name', 'cohorts.id', "cohorts.name")
    .where({ "cohorts.id": cohortId });
}


