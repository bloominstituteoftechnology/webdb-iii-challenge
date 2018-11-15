
//dependencies
const express = require('express');
const router = express.Router();
const knex = require('knex');

//set up knex and DB
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

//router endpoints
router.get('/', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => res.status(500).json(err))
})

module.exports = router;