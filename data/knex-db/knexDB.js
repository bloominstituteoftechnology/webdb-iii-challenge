const knex = require("knex")
const config = require('../../knexfile')

const knexDB = knex(config.development)

const get = () => {
 return knexDB('cohort')
}

const getById = (id) => {
 return knexDB('cohorts')
              .where({id: id})
}

const post = (post) => {
 return knexDB('cohorts')
             .insert(post)
             .then(ids => ({id: ids[0]}))
}

const edit = (id, post) => {
 return knexDB('cohorts')
              .where({id: id})
              .update(post)
}

const remove = (id) => {
 return knexDB('cohorts')
              .where({ id })
              .del()
}