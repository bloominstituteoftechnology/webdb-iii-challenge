// intialize route
const express = require('express');
const router = express.Router();
const db = require('../../index.js');

// add middleware
const numberIdCheck = require('../middleware/numberIdCheck');

// CRUD logic

// Create/Post logic
router.post('/', (req, res) => {
    const student = req.body;
    const studentName = req.body.name
    if (studentName && student) {
        db.
            insert(student)
            .then(newstudent => {
                if (newstudent) {
                    res
                        .status(201)
                        .json(newstudent);
                } else if (!newstudent) {
                    res
                    .status(400)
                    .json({ err: 'Bad request [error 400]'});
                }
            })
            .catch(err => res.status(500).json({ err: 'failed to add student!'}))
    } else if (!studentName) {
        res.status(400).json({ err: 'Bad request [no name field]'})
    } else res.status(500).json({ err: 'Failed to add student'})
})

// Read/get logic
router.get('/', (req, res) => {
    db
        .get()
        .then(students => {
            res
            .status(200)
            .json(students);
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve students from database' });
        });
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    if (numberIdCheck(id)) {
        db
        .get(id)
        .then(student => {
            if (student) {
                res
                .status(200)
                .json(student);
            } else if (!student) {
                res
                .status(404)
                .json({ err: 'Could not find student with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not retrieve students from database' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not retrieve student from database (ID is not integer or internal error)...'});
    }
    
})

// Update/put logic
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const studentName = req.body.name
    const changes = req.body
    if (name && name.length < 128) {
        db
        .update(id, changes)
        .then(count => {
            if (count) {
                res
                .status(200)
                .json({ message: `student ${id} successfully updated!`});
            } else if (!count) {
                res
                .status(404)
                .json({ err: 'Could not find student with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not update student...' });
        });
    } else if (!studentName || studentName.length > 128) {
        res
            .status(400)
            .json({ err: 'Could not update student (check if name is valid and less than 128 chars!)'})
    } else {
        res
        .status(500)
        .json({ err: 'Could not update student...'});
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
                .json({ message: `student ${id} successfully deleted!`});
            } else if (!count) {
                res
                .status(404)
                .json({ err: 'Could not find student with specified ID from database' });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ err: 'Could not delete student...' });
        });
    } else {
        res
        .status(500)
        .json({ err: 'Could not delete student (Invalid ID input or internal server error)...'});
    }
    
})

module.exports = router;