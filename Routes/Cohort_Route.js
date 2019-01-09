const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbconfig = require('../knexfile');
const db = knex(dbconfig.development);

router.post('/', (req, res) => {
    const name = req.body;
    console.log(name)
    if (!name) {
        res.status(404)
            .json({ error: "Please provide complete cohort information." })
        return
    }
    db('cohorts').insert(name)
        .then(id => {
            res
                .status(201)
                .json(id)
        }).catch(err => {
            console.log(err)
            res
                .status(500)
                .json({ error: "Error adding cohort to router", err })
        })
})
router.get('/', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res
                .status(200)
                .json(cohorts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: err })
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts').where('id', id)
        .then(cohort => {
            if (cohort.length) {
                res
                    .status(200)
                    .json(cohort);
            } else {
                res
                    .status(404)
                    .json({
                        error: "The cohort with the specified ID does not exist."
                    })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
})
router.put('/:id', (req, res) => {
    const name = req.body;
    const { id } = req.params;
    if (!name || !id) {
        res.status(404)
            .json({ error: "Please provide cohort information and/or ID." })
        return
    }
    db('cohorts').where('id', id).update(name)
        .then(id => {
            if (id) {
                res
                    .status(201)
                    .json(id);
            } else {
                res
                    .status(404)
                    .json({ error: "The cohort with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The cohort could not be updated", err })
        })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts').where('id', id).del()
        .then((count) => {
            if (count) {
                res
                    .status(200)
                    .json(count);
            } else {
                res
                    .status(404)
                    .json({ error: "The cohort with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The cohort could not be removed" })
        })
});

module.exports = router;