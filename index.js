const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile.js')

const db = knex(knexConfig.development)
const server = express()

server.use(express.json())

const get = tbl => {
    server.get(`/api/${tbl}`, (req, res) => {
        db(tbl)
            .then(tbl => res.status(200).json(tbl))
            .catch(err => res.status(500).json(err))
    })
}

const getById = tbl => {
    server.get(`/api/${tbl}/:id`, (req, res) => {
        const { id } = req.params
        db(tbl)
            .where({ id })
            .then(tbl => res.status(200).json(tbl))
            .catch(err => res.status(500).json(err))
    })
}

const add = tbl => {
    server.post(`/api/${tbl}`, (req, res) => {
        const newItem = req.body
        db(tbl)
            .insert(newItem)
            .then(id => res.status(201).json(id))
            .catch(err => res.status(500).json(err))
    })
}

const update = tbl => {
    server.put(`/api/${tbl}/:id`, (req, res) => {
        const changes = req.body
        const { id } = req.params
        db(tbl)
            .where({ id })
            .update(changes)
            .then(count => res.status(200).json(count))
            .catch(err => res.status(500).json(err))
    })
}

const remove = tbl => {
    server.delete(`/api/${tbl}/:id`, (req, res) => {
        const { id } = req.params
        db(tbl)
            .where({ id })
            .del(id)
            .then(count => res.status(200).json(count))
            .catch(err => res.status(500).json(err))
    })
}

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params
    db("cohorts as c")
        .join("students as s", "c.id", "s.cohort_id")
        .where("c.id", id)
        .then(students => res.status(200).json(students))
        .catch(err => res.status(500).json(err))
})

server.get('/api/students/:id', (req, res) => {
    const { id } = req.params
    db("students as s")
        .join("cohorts as c", "c.id", "s.cohort_id")
        .where("s.id", id)
        .select("s.id", "s.name", "c.name as cohort")
        .then(student => res.status(200).json(student))
        .catch(err => res.status(500).json(err))
})

get('cohorts')
get('students')
getById('cohorts')
add('cohorts')
add('students')
update('cohorts')
update('students')
remove('cohorts')
remove('students')

const port = 9000;
server.listen(port, function() {
    console.log(`\n=== listening :) ===\n`)
});