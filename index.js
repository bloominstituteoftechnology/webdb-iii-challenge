const express = require('express')
const server = express()
server.use(express.json())


const knex = require('knex')
const dbConfig = require('./knexfile')
const db = knex(dbConfig.development)


server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(results => res.json(results))
        .catch(err => res.json(err))
});

server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({id: req.params.id})
        .first()
        .then(idRes => res.json(idRes))
        .catch(err => res.json(err))
})

server.post('/api/cohorts', (req, res) => {
    db('cohorts').insert(req.body)
        .then(id => res.json(id))
        .catch(err => res.json(err))
})

server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts').where({id: req.params.id})
        .del()
        .then(count => res.json(count))
        .catch(err => res.json(err))
})

server.put('/api/cohorts/:id', (req,res) => {
    db('cohorts').where({id:req.params.id})
        .update(req.body)
        .then(count => res.json(count))
        .catch(err => res.json(err))
})

server.listen(3300, () => console.log('testing'))
