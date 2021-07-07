const knex = require("knex")
const config = require('../../knexfile.js')
const knexDB = knex(config.development)

const pull = () => {
 return knexDB('students')
}

const pullById = (id) => {
 // check this to see if we need to alter
 return knexDB('students')
              .from('students')
              .select('name', 'id', 'track')
              .where({id: id})
}

const place = (student) => {
 return knexDB('students')
             .insert(student)
             .then(ids => ({id: ids[0]}))
}

const alter = (id, student) => {
 return knexDB('students')
              .where({id: id})
              .update(student)
}

const clear = (id) => {
 return knexDB('students')
              .where({ id })
              .del()
}




module.exports = {
 pull,
 pullById,
 place,
 alter,
 clear
}