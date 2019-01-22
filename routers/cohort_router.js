const express = require('express');

const db = require('../data/db.Config.js')
const router = express.Router();

router.post('/', (req, res) =>{
    const cohort = req.body
    db('cohorts').insert(cohort)
    .then(ids =>{
        res.status(201).json(ids)
    })
    .catch(err =>{
        res.status(404).json({error:"this is an error in the post"})
    })
})

router.get('/', (req, res)=>{
    db('cohorts')
    .then(rows =>{
        res.json(rows)
    })
    .catch(err=>{
        res.status(500).json({error:"this is the error in the get"})
    })
})

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    db('cohorts').get(id)
    .then(cohort =>{
        if(cohort){
            res.json(cohort)
        }else{
            res.status(404).json({message:"The cohort with the specified id does not exist"})
        }
    }).catch(err =>{
        res.status(500).json({message:"Trouble getting the cohort"})
    })
})

router.get('/:id/students', (req, res)=>{
    const { id } = req.params
    db('cohorts').join('students', 'cohorts.id', 'students.cohort_id')
    .select('cohorts.name as cohort', 'students.name')
    .where('students.cohort_id', id)
    .then(joined =>{
        console.log(joined)
        res.json(joined)
    })
})
module.exports= router;