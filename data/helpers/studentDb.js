const db = require('../dbConfig')

module.exports = {
    get: id => {
        let query = db('students');
        if (id) {
            query.where('id', Number(id)).first()
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