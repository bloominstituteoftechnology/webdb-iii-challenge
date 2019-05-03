const express = require('express');
const knex = require('knex');
const router = express.Router();

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

router.post('/', (req, res) => {
    const student = req.body;
    db('students').insert(student)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to insert student"});
    });
});

router.get('/', (req, res) => {
    db('students as s')
        .join('cohorts as c', 'c.id', 's.cohort_id')
        .select('s.id as id', 's.name as name', 'c.name as cohort')
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get students"});
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('students as s')
        .join('cohorts as c', 'c.id', 's.cohort_id')
        .select('s.id as id', 's.name as name', 'c.name as cohort')
        .where('s.id', id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get student"});
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const student = req.body;
    db('students').where('id', id).update(student)
    .then(rowCount => {
        res.json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to update student"});
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('students').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to delete student"});
    });
});

module.exports = router;