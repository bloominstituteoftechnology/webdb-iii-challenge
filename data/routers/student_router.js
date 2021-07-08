const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../../knexfile');
const db = knex(dbConfig.development);

router.use((req, res, next) => {
    next();
});

router.get('/', (req, res) => {
    db('students')
    .then(students => {
        res.json(students);
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find students"});
    })
});

router.post('/', (req, res) => {
    const student = req.body;

    if (student.name && student.cohort_id) {
        db('students').insert(student)
        .then((ids) => {
            res.status(201).json(ids);
        })
        .catch(err => {
    
            res.status(500).json({ err: "Failed to insert student"});
        });
    } else {
        res.status(400).json({message: "Provide student name and cohort_id."})
    }
    
});

// **** Have the student returned by the [GET] /students/:id endpoint include the cohort name and remove the cohort_id fields.
router.get('/:id', (req, res) => {
    const id = req.params.id;
    db('students').where('id', id)
    .then(student => {
        if (student.length > 0) {
            res.json(student);
        }
        else {
            res.status(404).json({error: "The student with the specified id does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find student"});
    })
});
// ***
// *** STILL NEED TO DO THIS!

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const student = req.body;

    if (student.name && student.cohort_id) {
        db('students').where('id', id)
        .update(student)
        .then(rowCount => {
            if (rowCount) {
                db('students').where('id', id)
                .then(student => {
                    res.json(student);
                });
            } else {
                res.status(404).json({message: "The student with the specified name does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({err: "Failed to update student"});
        })
    } else {
        res.status(400).json({message: "Provide student name and cohort_id."});
    }
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('students').where('id', id)
    .del()
    .then(rowCount => {
        if (rowCount) {
            res.status(201).json(rowCount);
        } else {
            res.status(404).json({message: "The cohort with the specified ID does not exist."});
        }
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete student"});
    })
});

module.exports = router;