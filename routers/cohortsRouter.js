//Create Router
const express = require('express');
const router = express.Router();

//Create db / knex connection
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

//********** */Route Handlers / Endpoints

//**GET - SELECT */

router.get('/', (req, res) =>{
    db('cohorts')
    .then(cohorts =>{
        res.status(200).json(cohorts)
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to retrieve cohorts"})
    })
})

//*** *SELECT/GET BY ID 
router.get('/:id', (req,res) =>{
    const id = req.params.id

    db('cohorts')
    .where('id', id)
    .then(cohort => {
        if(cohort[0]){
           res.status(200).json(cohort);
        }else {
            res.status(404).json({error: "The specified cohort does not exist"});
        }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to retrieve specified cohort"})
    })
})

//*** INSERT*/
router.post('/', (req, res) =>{
    const newCohort = req.body;

    db('cohorts')
    .insert(newCohort)
    .then(id =>{
        res.status(201)
        res.json(id)
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to create new cohort"})
    })

    
})

//***UPDATE */
router.put('/:id', (req,res) =>{
    const id = req.params.id;
    const updatedCohort = req.body;

    db('cohorts')
    .where('id', id)
    .update(updatedCohort)
    .then(count =>{
        if(count){
            res.status(200).json(count)
        }else {
            res.status(404).json({error: "The specified cohort does not exist"})
        }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to update the specified cohort"})
    })
})

//**DELETE */
router.delete('/:id', (req, res) =>{
    const id = req.params.id;

    db('cohorts')
    .where('id', id)
    .del()
    .then(count =>{
        if(count){
            res.status(200).json(count)
        }else{
            res.status(404).json({error: "The specified cohort does not exist"})
        }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to delete the specified cohort"})
    })
})



module.exports = router;
