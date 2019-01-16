const knex = require('knex');
const knexConfig = require('../knexfile.js');

//connection to the data base
const db = knex(knexConfig.development);

module.exports = {
    findStudents, 
    findStudentById,
    addStudent,
    updateStudent,
    removeStudent,


}

function findStudents() {
    return db('students');
}

function findStudentById(id) {
    return db('students').where({id}).first();
}

function addStudent(student){
    return db('students')
    .insert(student)
    .into('students');
}

function updateStudent(id, changes) {
    return db('students').where({id})
    .update(changes)
}

function removeStudent(id) {
    return db('students')
    .where({id})
    .del();
}
