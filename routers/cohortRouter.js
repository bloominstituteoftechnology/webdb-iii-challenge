const express = require('express');
const knex = require('knex');
const router = express.Router();

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

router.post('/', (req, res) => {
    const cohort = req.body;
    db('cohorts').insert(cohort)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to insert cohort"});
    });
});

router.get('/', (req, res) => {
    db('cohorts')
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get cohorts"});
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('cohorts').where('id', id)
    .then(rows => {
        res.json(rows);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get cohort"});
    });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const cohort = req.body;
    db('cohorts').where('id', id).update(cohort)
    .then(rowCount => {
        res.json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to update cohort"});
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db('cohorts').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to delete cohort"});
    });
});

// special endpoint get students in cohort by cohort id
router.get('/:id/students', (req, res) => {
    const id = req.params.id;
    db('students as s')
        .join('cohorts as c', 'c.id', 's.cohort_id')
        .select('s.id as ID', 's.name as Name', 'c.name as Cohort')
        .where('c.id', id)
    .then(rowCount => {
        res.status(201).json(rowCount);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to get students from cohort"});
    });
});

module.exports = router;