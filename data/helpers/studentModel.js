const db = require('../dbConfig');

module.exports = {
  get,
  insert,
  update,
  remove
};

function get(id) {
  if (id) {
    return db('students as s')
      .join('cohorts as c', 'c.id', 's.cohort_id')
      .select('s.id', 's.name', 'c.name as cohort')
      .where({ 's.id': id });
  }

  return db('students');
}

function insert(name) {
  return db('students').insert(name);
}

function update(id, name) {
  return db('students')
    .where({ id: Number(id) })
    .update(name);
}

function remove(id) {
  return db('students')
    .where({ id: Number(id) })
    .del();
}
