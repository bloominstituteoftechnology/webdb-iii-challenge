const express = require('express');
const studentsTable = require('../../data/helpers/studentsmodel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// Routes
// ~~~ GET ~~~ //
// find()
router.get('/', (req, res, next) => {
    studentsTable.find()
        .then((studentsList) => {
            res.status(200).json(studentsList);
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// find(id)
router.get('/:id/get', (req, res, next) => {
    studentsTable.find(req.params.id)
        .then((student) => {
            if(student) {
                res.status(200).json(student);
            } else {
                next(["h404", "Student not found!"]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// findWithCohort(id)
router.get('/:id', (req, res, next) => {
    studentsTable.findWithCohort(req.params.id)
        .then((studentsList) => {
            if(studentsList.length > 0) {
                res.status(200).json(studentsList);
            } else {
                next(["h404", "No students in cohort!"]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// ~~~ POST ~~~ //
// add(newStudent)
router.post('/', (req, res, next) => {
    const { name, cohort_id } = req.body;
    if(name && cohort_id) {
        studentsTable.add({name, cohort_id})
            .then((postId) => {
                res.status(201).json({"studentId": postId[0]});
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing object property!"]);
    }
    
});

// ~~~ PUT ~~~ //
// update(id, changes)
router.put('/:id', (req, res, next) => {
    const { name, cohort_id } = req.body;
    if(name && cohort_id) {
        studentsTable.update(req.params.id, {name, cohort_id})
            .then((updateCount) => {
                if(updateCount > 0) {
                    res.status(200).json({"updateCount": updateCount});
                } else {
                    next(["h404", "Student not found!"]);
                }
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing object property!"]);
    }
});

// ~~~ DELETE ~~~ //
// remove(id)
router.delete('/:id', (req, res, next) => {
    studentsTable.remove(req.params.id)
        .then((deleteCount) => {
            if(deleteCount > 0) {
                res.status(200).json({"deleteCount": deleteCount});
            } else {
                next(["h404", "Student not found!"]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.use(errorHandler);

module.exports = router;
