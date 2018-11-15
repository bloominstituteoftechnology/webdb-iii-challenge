
//dependencies
const express = require('express');
const router = express.Router();
const knex = require('knex');

//set up knex and DB
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

//router endpoints
router.get('/', (req, res) => {
    db('students')
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => res.status(500).json(err))
})
module.exports = router; 