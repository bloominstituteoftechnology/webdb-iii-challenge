const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile.js');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());

// add to cohorts table

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts')
            .insert(cohort)
            .then(id => {
                res
                    .status(201)
                    .json(id);
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'The new cohort could not be added at this time.'});
            });
    }
    else {
        res
            .status(400)
            .json({message: 'Please include the cohort name.'});
    }
});

const PORT = 4400;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});