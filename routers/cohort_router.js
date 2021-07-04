const express = require('express');
const knex = require('knex');
const dbConfig = require('../knexfile');

const router = express.Router();
const db = knex(dbConfig.development);

router.use(express.json());

router.get('/', (req, res) => {
    db('cohorts')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get cohorts'})
    })
})

//GET by ID
router.get('/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get that cohort'})
    })
})

//GET students buy cohort ID
router.get('/:id/students', (req, res) => {
    const {id} = req.params;
    db('students').where('cohort_id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to find those students in that cohort'})
    })
})

//Create new cohort
router.post('/', (req, res) => {
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts').insert(cohort)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to insert cohort'})
        })
    }
})

//update cohort by ID
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const cohort = req.body;

    db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
        res.json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to update cohort'})
    })
})

//delete cohort by ID
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db('cohorts').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to delete that cohort'})
    })
})

module.exports = router