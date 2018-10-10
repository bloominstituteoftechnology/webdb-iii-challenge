const express = require('express');
const cohortsTable = require('../../data/helpers/cohortsmodel');
const errorHandler = require('../ErrorHandler/errorhandler');
const router = express.Router();

// Routes
// ~~~ GET ~~~ //
// find()
router.get('/', (req, res, next) => {
    cohortsTable.find()
        .then((cohortsList) => {
            res.status(200).json(cohortsList);
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// find(id)
router.get('/:id', (req, res, next) => {
    cohortsTable.find(req.params.id)
        .then((cohort) => {
            if(cohort) {
                res.status(200).json(cohort);
            } else {
                next(["h200", "Cohort doesn't exist!"]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// findStudentsByCohort(id)
router.get('/:id/students', (req, res, next) => {
    cohortsTable.findStudentsByCohort(req.params.id)
        .then((studentsList) => {
            if(studentsList) {
                res.status(200).json(studentsList);
            } else {
                next(["h404", "Cohort doesn't exist!"]);
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

// ~~~ POST ~~~ //
// add(newCohort)
router.post('/', (req, res, next) => {
    const { name } = req.body;
    if(name) {
        cohortsTable.add({ name })
            .then((postId) => {
                res.status(201).json({"postId": postId[0]});
            })
            .catch((err) => {
                next(["h500", err]);
            });
    } else {
        next(["h400", "Missing object property!"])
    }
});

// ~~~ PUT ~~~ //
// update(id, changes)
router.put('/:id', (req, res, next) => {
    const { name } = req.body;
    if(name) {
        cohortsTable.update(req.params.id, { name })
            .then((updateCount) => {
                if(updateCount > 0) {
                    res.status(200).json({"updateCount": updateCount});
                } else {
                    next(["h404", "Cohort not found!"]);
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
    cohortsTable.remove(req.params.id)
        .then((deleteCount) => {
            if(deleteCount) {
                res.status(200).json({"deleteCount": deleteCount});
            } else {
                next(["h404", "Cohort not found!"])
            }
        })
        .catch((err) => {
            next(["h500", err]);
        });
});

router.use(errorHandler);

module.exports = router;
