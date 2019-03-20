// intialize route
const express = require('express');
const router = express.Router();
const db = require('../../index.js');

// add middleware
const numberIdCheck = require('../middleware/numberIdCheck');

// CRUD logic

// Create/Post logic
router.post('/', (req, res) => {
    const cohort = req.body;
    const cohortName = req.body.name
    if (cohortName && cohort) {
        db.
            insert(cohort)
            .then(newCohort => {
                if (newCohort) {
                    res
                        .status(201)
                        .json(newCohort);
                } else if (!newCohort) {
                    res
                    .status(400)
                    .json({ err: 'Bad request [error 400]'});
                }
            })
            .catch(err => res.status(500).json({ err: 'failed to add cohort!'}))
    } else if (!cohortName) {
        res.status(400).json({ err: 'Bad request [no name field]'})
    } else res.status(500).json({ err: 'Failed to add cohort'})
})

// Read/get logic
router.get('/', (req, res) => {
    db
        .get()
        .then(cohorts => {
            res
            .status(200)
            .json(cohorts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve cohorts from database' });
        });
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (numberIdCheck(id)) {
        db
        .get(id)
        .then(cohort => {
            if (cohort) {
                res
                .status(200)
                .json(cohort);
            } else if (!cohort) {
                res
                .status(404)
                .json({ err: 'Could not find cohort with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve cohorts from database' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not retrieve cohort from database (ID is not integer or internal error)...'});
    }
    
})

// Update/put logic
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const cohortName = req.body.name
    const changes = req.body
    if (name && name.length < 128) {
        db
        .update(id, changes)
        .then(count => {
            if (count) {
                res
                .status(200)
                .json({ message: `cohort ${id} successfully updated!`});
            } else if (!count) {
                res
                .status(404)
                .json({ err: 'Could not find cohort with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not update cohort...' });
        });
    } else if (!cohortName || cohortName.length > 128) {
        res
            .status(400)
            .json({ err: 'Could not update cohort (check if name is valid and less than 128 chars!)'})
    } else {
        res
        .status(500)
        .json({ err: 'Could not update cohort...'});
    }
    
})

// Delete/remove logic
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (numberIdCheck(id)) {
        db
        .remove(id)
        .then(count => {
            if (count) {
                res
                .status(200)
                .json({ message: `cohort ${id} successfully deleted!`});
            } else if (!count) {
                res
                .status(404)
                .json({ err: 'Could not find cohort with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not delete cohort...' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not delete cohort (Invalid ID input or internal server error)...'});
    }
    
})

module.exports = router;