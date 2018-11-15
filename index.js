const express = require('express')
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.send({ message: "API is running" })
})

server.post('/api/cohorts', (req, res) => {
    const {name} = req.body
    if (!name) {
        res.status(400).json({ message: "Provide name for the new cohort." })
    } else {
        db('cohorts')
            .insert(req.body)
            .returning('id')
            .then(ids => {
            res.status(201).json(ids)
            })
            .catch(error => {
            res.status(500).json({ message: "There was an error while saving the cohort to the database.", error: error })
            })
    }
})

server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(error => {
        res.status(500).json({ message: "The cohort information could not be retrieved.", error: error })
    })
})

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params
    db('cohorts')
        .where('id', Number(id)).first()
        .then(cohort => {
            if (cohort) {
                res.status(200).json(cohort)
            } else {
                res.status(404).json({ message: "The cohort with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "The cohort information could not be retrieved.", error: error })
        })
})

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params
    db('cohorts')
        .where('id', Number(id)).first()
        .then(cohort => {
            if (cohort) {
                db('students')
                    .where('cohort_id', Number(id))
                    .then(students => res.status(200).json(students))
                    .catch(error => res.status(500).json({ message: "The student information could not be retrieved.", error: error }))
            } else {
                res.status(404).json({ message: "The cohort with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "The cohort information could not be retrieved.", error: error })
        })
})

server.put('/api/cohorts/:id', (req, res) => {
    const { name } = req.body
    if (!name) {
        res.status(400).json({ message: "Provide name for the updated cohort." })
    } else {
        db('cohorts')
            .where({ id: req.params.id })
            .update(req.body)
            .then(cohort => {
                if (cohort) {
                    res.status(200).json(cohort)
                } else {
                    res.status(404).json({ message: "The cohort with the specified ID does not exist." })
                }
            })
            .catch(error => res.status(500).json({ message: "The cohort could not be updated", error: error }))
    }
})

server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params
    db('cohorts')
      .where({ id: id })
      .del()
      .then(cohort => {
        if (cohort) {
            res.status(200).json(cohort)
        } else {
            res.status(404).json({ message: "The cohort with the specified ID does not exist" })
        }
      })
      .catch(error => {
          res.status(500).json({ message: "The cohort could not be removed.", error: error })
        })
})

 server.listen(9000, () => console.log(`Listening on http://localhost:9000`)) 