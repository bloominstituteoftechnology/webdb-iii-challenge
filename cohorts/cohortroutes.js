const express = require('express');
const knex = require('knex');
 
const dbConfig = require('../knexfile');
 
const db = knex(dbConfig.development);

const router = express.Router();

// cohort endpoints

router.get('/', (req,res) => {
    db('cohorts')
    .then (cohorts =>{
    res.status(200).json(cohorts)
    })
    .catch(err => res.status(500).json(err))
});

router.get('/:id', (req,res) => {
    db('cohorts')
    .where({ id: req.params.id })
    .then(cohort => {
        res.status(200).json(cohort)
    })
});

router.get('/:cohort_id/students', (req,res) => {
    db('students')
    .where({ cohort_id: req.params.cohort_id })
    .then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err))
})


router.post('/', (req, res) => {
    const cohort = req.body;
    if(!cohort) {
        res.status(400).status({ message: "Please provide a name for cohort"})
    }
    db.insert(cohort)
    .into('cohorts')
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err)) 
});

router.delete('/:id', (req, res) =>{
    db('cohorts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        if(count) {
        res.status(204).end()
        } else {
        res.status(404).json({ message: "There was no cohort with this id found"})
        }
    })
    .catch(err => res.status(500).json(err))
});

router.put('/:id' , (req ,res) => {
    const cohort = req.body;
    db('cohorts')
    .where({ id: req.params.id })
    .update(cohort)
    .then(cohort => {
    if(cohort) {
        res.status(200).json({ message: "This cohort has been updated"})
    } else {
       res.status(404).json({ message: "No cohort with this id was found"})
    }
    })
    .catch( err =>{
    res.status(500).json({ message: "Update Failed"})
    })
});

module.exports = router;