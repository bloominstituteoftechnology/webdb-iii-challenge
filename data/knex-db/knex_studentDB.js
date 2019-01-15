const knex = require("knex")
const config = require('../../knexfile.js')
const knexDB = knex(config.development)

const pull = () => {
 return knexDB('students')
}

const pullById = (id) => {
 return knexDB('students')
              .where({id: id})
}

const place = (student) => {
 return knexDB('students')
             .insert()
}