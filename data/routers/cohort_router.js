const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    db('cohorts')
    
    .then(cohorts => {
        res.json(cohorts);
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find cohorts"});
    })
});

router.post('/', (req, res) => {
    const cohort = req.body;

    if (cohort.name) {
        db('cohorts').insert(cohort)
        .then((ids) => {
            res.status(201).json(ids);
        })
        .catch(err => {
            
            res.status(500).json({ err: "Failed to insert cohort"});
        });
    } else {
        res.status(400).json({message: "Provide cohort name."})
    }
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('cohorts').where('id', id)
    .then(cohort => {
        if (cohort.length > 0) {
            res.json(cohort);
        }
        else {
            res.status(404).json({error: "The post with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find cohort"});
    })
});

// *** [GET] /api/cohorts/:id/students
router.get('/:id/students', (req, res) => {
    const { id } = req.params;
    
    db('students').where('cohort_id', id)
    .then(students => {
        if (students.length > 0) {
            res.json(students);
        } else {
            res.status(400).json({message: "The cohort with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({ err: `Error obtaining ${cohort_id} cohort`})
    })
});
// ***

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const cohort = req.body;
    
    if (cohort.name) {
        db('cohorts').where('id', id)
        .update(cohort)
        .then(rowCount => {
            if (rowCount) {
                db('cohorts').where('id', id)
                .then(cohort => {
                    res.json(cohort);
                });
            } else {
                res.status(404).json({message: "The cohort with the specified name does not exist."});
            }
        })
        .catch(err => {
            res.status(500).json({err: "Failed to update cohort"});
        })
    } else {
        res.status(400).json({message: "Provide cohort name."});
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('cohorts').where('id', id)
    .del()
    .then(rowCount => {
        if (rowCount) {
            res.status(201).json(rowCount);
        } else {
            res.status(404).json({message: "The cohort with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete cohort."});
    })
});

module.exports = router;