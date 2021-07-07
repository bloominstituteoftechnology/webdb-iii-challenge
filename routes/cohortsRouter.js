
const router = require('express').Router();

const cohorts  = require('../controllers/controllerCohorts.js');


router.post('/', cohorts.addCohort)

router.get('/:id/students', cohorts.getAllCohortStudents)

router.get('/',cohorts.getAllCohorts)

router.get('/:id', cohorts.getSingleCohort)

router.put('/:id', cohorts.updateCohort)

router.delete('/:id', cohorts.deleteCohort)

module.exports = router