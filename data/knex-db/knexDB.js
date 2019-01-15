const knex = require("knex")
const config = require('../../knexfile.js')

const knexDB = knex(config.development)

const pull = () => {
 return knexDB('cohorts')
}

const pullById = (id) => {
 return knexDB('cohorts')
              .where({id: id})
}

const place = (post) => {
 return knexDB('cohorts')
             .insert(post)
             .then(ids => ({id: ids[0]}))
}

const alter = (id, post) => {
 return knexDB('cohorts')
              .where({id: id})
              .update(post)
}

const clear = (id) => {
 return knexDB('cohorts')
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