// bring in express
const express = require('express');

// bring in knex model
const cohortModel = require('./cohortModels.js');

// why router instead of server?
// allows us to split up different routes,
// rather than mixing up routes in the server
const router = express.Router();

// GET
router.get('/', (req, res) => {
    cohortModel
        .find()
            .then(cohorts => {
                res.status(200).json(cohorts);
            })
            .catch(err => {
                res.status(500).json({err});
            })
});

// GET ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    cohortModel
        .findById(id)
            .then(cohort => {
                res.status(200).json(cohort)
            })
            .catch(err => {
                res.status(500).json(err)
            })
})

// POST
router.post('/', (req, res) => {
    const cohort = req.body;
    cohortModel
        .add(cohort)
            .then(id => {
                res.status(200).json(res);
            })
            .catch(err => {
                res.status(500).json(err);
            })
});

// DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    cohortModel
        .remove(id)
            .then(res => {
                console.log('working?')
                res.status(200).json({ message: `Cohort with id ${id} was removed` });
            })
            .catch(err => {
                res.status(500).json({ error: `id ${id} was not found`});
            })
});

// UPDATE

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const newCohort = req.body;
    cohortModel
        .update(id, newCohort)
            .then(res => {
                res.status(200).json(res)
            })
            .catch(err => {
                res.status(500).json(err)
            })
});

module.exports = router;