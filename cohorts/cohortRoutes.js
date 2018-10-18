// bring in express
const express = require('express');

// bring in knex model
const cohortModel = require('./cohortModels.js');

// why router instead of server?
// allows us to split up different routes,
// rather than mixing up routes in the server
const router = express.Router();

router.get('/', (req, res) => {
    cohortModel
        .find()
            .then(cohorts => {
                res.status(200).json(cohorts);
            })
            .catch(err => {
                res.status(500).json({err});
            })
});

module.exports = router;