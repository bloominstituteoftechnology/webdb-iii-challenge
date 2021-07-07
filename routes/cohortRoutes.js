const express = require('express')
const route = express.Router()
const cohortDb = require('../data/helpers/cohortDb')

route.get('/', (req, res) => {
    cohortDb.get()
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json(err))
})

// Get cohort by ID
route.get('/:id', (req, res) => {
    const {id} = req.params
    cohortDb.get(id)
    .then(cohort => {
        res.status(200).json(cohort)
    })
    .catch(err => {res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})})
    })
    
    // Get cohort students by ID
    route.get('/:id/students', (req, res) => {
        cohortDb.getCohortStudents(req.params.id)
        .then(students => {
            res.status(200).json(students)
        })
        .catch(err => {res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})})
    })
    
    // Add cohort
    route.post('/', (req, res) => {
       const {name} = req.body
        cohortDb.insert({name})
        .then(cohort => {
            res.status(200).json({Message: `You successfully added a new cohort`})
        })
        .catch(err => {
            res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})
        })
    })
    
    // Delete a single cohort by ID
    route.delete('/:id', (req, res) => {
        const {id} = req.params
        cohortDb.remove(id)
        .then(count => {
            if(count < 1) {
                return res.status(404).json({Error: 'cohort with that ID does not exist.'})
            }
            res.status(200).json({Message: 'You successfully deleted the post.'})
        })
        .catch
        (err => {res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})})
    })

    // Edit a single cohort
    route.put('/:id', (req, res) => {
        const {id} = req.params
        const {name} = req.body
        cohortDb.update(id, {name})
        .then(count => {
            if(count < 1) {
                return res.status(404).json({Error: 'cohort with that ID does not exist.'})
            }
            res.status(200).json({Message: 'You successfully updated this cohort.'})
        })
        .catch(err => {
            res.status(500).json({message: `Sorry, something went wrong on our end, see details: ${err}`})
        })
    })

module.exports = route;