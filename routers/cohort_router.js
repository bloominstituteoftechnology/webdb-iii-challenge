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

router.put('/:id', (req, res) =>{
    const { id } = req.params;
    const cohort = req.body;
    db('cohorts').where('id', id).update(cohort)
    .then(count =>{
        if(count){
            db('cohorts').where({ id })
            .then(updated =>{
                res.status(201).json(updated)
            }).catch(err =>{
                res.status(404).json({error:"Could not update the specified Cohort!"})
            })
        }
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error:"Could not update the Cohort"})
    })
})

router.delete('/:id', (req , res)=>{
    const { id } = req.params;
    db('cohorts').where('id', id).del()
    .then(deleted =>{
        if(deleted){
            res.status(201).json({message:"The cohort was deleted"})
        }else{
            res.status(404).json({error:"Unable to delete the Cohort!"})
        }
    }).catch(err =>{
        res.status(500).json({error:"Sorry unable to delete something went wrong with the database!"})
    })
})
module.exports= router;