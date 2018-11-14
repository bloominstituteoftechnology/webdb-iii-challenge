const db = require('../dbConfig')

module.exports = {
    get: id => {
        let query = db('cohorts');
        if (id) {
            query.where('id', Number(id)).first()
        }
        return query
    },
    getCohortStudents: cohort_id => {
        return db('students as s')
        .join('cohorts as c', 'c.id', 's.cohort_id')
        .select('s.id', 's.name', 'c.name as cohort')
        .where('s.cohort_id', cohort_id)
    },
    insert: cohort => {
        return db('cohorts')
        .insert(cohort)
        .then(ids => ({id: ids[0]}))
    },
    update: (id, cohort) => {
        return db('cohorts')
        .where('id', id)
        .update(cohort)
    },
    remove: id => {
        return db('cohorts')
        .where('id', id)
        .del()
    }
}