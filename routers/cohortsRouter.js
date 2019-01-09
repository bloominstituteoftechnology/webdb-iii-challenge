//Create Router
const express = require('express');
const router = express.Router();

//Create db / knex connection
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

//********** */Route Handlers / Endpoints

//**GET - SELECT */
//SELECT - GET
router.get('/', (req, res) =>{
    db('cohorts')
    .then(cohorts =>{
        res.status(200).json(cohorts)
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to retrieve cohorts"})
    })
})

module.exports = router;
