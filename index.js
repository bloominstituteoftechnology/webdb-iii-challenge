const express = require('express');
const server = express();
const knex = require('knex');
const dBConfig = require('./knexfile');
server.use(express.json());
const db = knex(dBConfig.development);

//endpoints

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db.insert(cohort).into('cohorts').then(res => res.status(201).json(res))
    .catch(err => res.status(500).json(err));
});

server.get('/api/cohorts', (req, res) => {
    db('cohorts').then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});


server.listen(3000, console.log('Listening on Port 3000'));