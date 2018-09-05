const express = require('express')
const router = express.Router()
const cohortController = require('../controllers')

router.get('/', cohortController.get)
router.post('/', cohortController.post)
router.get('/:id', cohortController.getId)
router.get('/:id/students', cohortController.getStudents)
router.put('/:id', cohortController.put)
router.delete('/:id', cohortController.del)

module.exports = router