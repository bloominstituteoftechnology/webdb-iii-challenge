const express = require('express');

const router = express.Router();

const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

//GET

router.get('/', (req, res) => {
    db('cohorts')
        .then(response => res.json(response))
        .catch(err => {res.status(500).json({ message: 'Unable to fetch cohorts' })})
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', id)
        .then(cohort => {
            if(Object.keys(cohort).length === 0){
                res.status(404).json({ message: "Invalid cohort ID" })
            } else {
                res.json(cohort)
            }
        })
        .catch(err => res.status(500).json({ message: "Unable to fetch that specific cohort"}))
});

router.get('/:id/students', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', id)
        .then(cohort => {
        if(Object.keys(cohort).length === 0){
            res.status(404).json({ message: "Invalid cohort ID" })
        } else {
            db('students').where('cohort_id', id)
                .then(students => {
                    if(Object.keys(students).length === 0){
                        res.status(404).json({ message: "This cohort doesn't have any students yet"})
                    } else {
                        res.json(students)
                    }
                })
                .catch(err => {res.status(500).json({ message: "Unable to fetch those students" })})
        }
    })
    .catch(err => res.status(500).json({ message: "Unable to fetch that specific cohort"}))
});


//POST

server.post('/', (req, res) => {
    const cohort = req.body;
    db('cohorts').insert(cohort)
        .then()
        .catch(err => {
            res.status(500).json({message: "Unable to add student"})
        })
});


//PUT

server.put('/:id', (req, res) => {

});


//DELETE

server.delete('/:id', (req, res) => {

});


module.exports = router;