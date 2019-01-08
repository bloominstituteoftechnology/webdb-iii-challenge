// const express = require('express');
// const knex = require('knex');
// const dbConfig = require('../../knexfile');

// const router = express.Router();
// const db = knex(dbConfig.development);

// router.use((req, res, next) => {
//     next();
// });

// router.get('/', (req, res) => {
//     db('cohorts').get()
//     .then((cohorts) => {
//         res.json(cohorts);
//     })
//     .catch(err => {
//         res.status(500)
//         .json({ error: "The cohorts could not be retrieved." })
//     });
// });

// module.exports = router;