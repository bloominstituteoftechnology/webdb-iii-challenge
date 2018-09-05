const express = require('express')
const router = express.Router()
const studentController = require('../controllers')

router.get('/', studentController.get)
router.post('/', studentController.post)
router.get('/:id', studentController.getStudentId)
router.put('/:id', studentController.put)
router.delete('/:id', studentController.del)

module.exports = router