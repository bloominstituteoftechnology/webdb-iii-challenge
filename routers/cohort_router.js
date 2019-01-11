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

module.exports= router;