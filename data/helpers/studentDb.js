const db = require('../dbConfig')

module.exports = {
    get: id => {
        let query = db('students');
        if (id) {
            query
            .join('cohorts', 'cohorts.id', 'students.cohort_id')
            .select('students.id', 'students.name', 'cohorts.name as cohort')
            .where('students.id', id)
            
        }
        return query
    },
    insert: student => {
        return db('students')
        .insert(student)
        .then(ids => ({id: ids[0]}))
    },
    update: (id, student) => {
        return db('students')
        .where('id', id)
        .update(student)
    },
    remove: id => {
        return db('students')
        .where('id', id)
        .del()
    }
}