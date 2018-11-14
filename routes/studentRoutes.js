const express = require('express')
const route = express.Router()
const studentDb = require('../data/helpers/studentDb')

route.get('/', (req, res) => {
    studentDb.get()
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => res.status(500).json(err))
})

// Get student by ID
route.get('/:id', (req, res) => {
    const {id} = req.params
    studentDb.get(id)
    .then(student => {
        res.status(200).json(student)
    })
    .catch(err => {res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})})
    })
    
    // Add student
    route.post('/', (req, res) => {
       const {cohort_id, name} = req.body
       if (!cohort_id || !name) {
        return res.status(400).json({Error: 'Please provide userId and text to add a new post.'})
    }
        studentDb.insert({cohort_id, name})
        .then(student => {
            res.status(200).json({Message: `You successfully added a new student`})
        })
        .catch(err => {
            res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})
        })
    })
    
    // Delete a single student by ID
    route.delete('/:id', (req, res) => {
        const {id} = req.params
        studentDb.remove(id)
        .then(count => {
            if(count < 1) {
                return res.status(404).json({Error: 'student with that ID does not exist.'})
            }
            res.status(200).json({Message: 'You successfully deleted the post.'})
        })
        .catch
        (err => {res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})})
    })
    // Edit a single student
    route.put('/:id', (req, res) => {
        const {id} = req.params
        const {name} = req.body
        studentDb.update(id, {name})
        .then(count => {
            if(count < 1) {
                return res.status(404).json({Error: 'student with that ID does not exist.'})
            }
            res.status(200).json({Message: 'You successfully updated this student.'})
        })
        .catch(err => {
            res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})
        })
    })

module.exports = route;