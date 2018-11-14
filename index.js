const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();
server.use(express.json());

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json({ cohorts })
        })
        .catch(err => {
            res.status(500).json({ message: 'error processing your request' })
        })
})

server.get('/api/cohorts/:id', (req, res) => {
    const id = req.params
        db('cohorts')
            .where(id)
            .then(cohort => {
                if(cohort.length === 0) {
                    res.status(404).json({ message: 'cohort by id could not be found' })
                } else {
                    res.status(200).json(cohort)
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'error processing your request' })
            })
})

server.post('/api/cohorts', (req, res) => {
    cohort = req.body
    if(!cohort.name || cohort.name.length === 0) {
        res.status(404).json({ message: 'Please enter a cohort name, can not be empty' })
    } else {
        db('cohorts').insert(cohort)
            .then(id => {
                res.status(201).json({ id: id, cohort })
            })
            .catch(err => {
                res.status(500).json({ message: 'error adding to database' })
            })

    }
})

server.put('/api/cohorts/:id', (req, res) => {
    const id = req.params 

    db('cohorts')
        .where(id)
        .update(req.body)
        .then(count => {
            if(count === 0) {
                res.status(404).json({ message: 'cohort by id can not be updated' })
            } else {
                res.status(200).json(req.body)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error updating cohort' })
        })
})

server.delete('/api/cohorts/:id', (req, res) => {
    const id = req.params

    db('cohorts')
        .where(id)
        .del()
        .then(count => {
            if(count === 0) {
                res.status(404).json({ message: 'Can not delete by this id' })
            } else {
                res.status(200).json({ message: `succesfully deleted`, count })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting cohort' })
        })
})

server.listen(9000, () => console.log('running'))