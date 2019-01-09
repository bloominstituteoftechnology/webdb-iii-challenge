const express = require('express');
const knex = require('knex');
const dbConfig = require('../knexfile');

const router = express.Router();
const db = knex(dbConfig.development);

router.use(express.json());

router.get('/', (req, res) => {
    db('students')
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get students'})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params;

    db('students').where('id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to get that student'})
    })
})

router.post('/', (req, res) => {
    const student = req.body;

    if(student.name && student.cohort_id) {
        db('students').insert(student)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to create new student'})
        })
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const student = req.body;

    if(student.name && student.cohort_id) {
        db('students').where('id', id).update(student)
        .then(rowCount => {
            res.json(rowCount)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to update student'})
        })
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db('students').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to delete student'})
    })
})

module.exports = router