const express = require('express')
const db = require('./cohortModel.js')
const router = express.Router()


router.post('/', (req, res) => {
    const cohort = req.body

    // save data to the database

})