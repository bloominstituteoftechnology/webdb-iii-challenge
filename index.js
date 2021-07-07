const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile')

const server = express();
const db = knex(dbConfig.development);
const Port = 5050;

server.use(express.json());
server.use(cors());

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts').insert(cohort)
        .then(response => {
            res
                .status(201)
                .json(response);
        })
        .catch(err => {
            console.log(error);
            res
                .status(500)
                .json({err: 'Failed to insert new cohort.'});
        })
});

server.get('./api/cohorts', (req, res) => {
    db('cohorts').select()
        .then(response => {
            res
                .status(200)
                .json(response);
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                ,json({err: 'Failed to find cohorts at this time.'});
        })
});
server.get('./api/cohorts/:id', (req, res) => {
    db('cohorts').where('id', req.params)
        .then(response => {
            res
                .status(200)
                .json(response);
        })
        .catch(error => {
            console.log(error);
            res
                .status(500)
                .json({err: 'Failed to find the cohort at this id.'});
        })
});

server.listen(Port, () => {
    console.log(`Server at Port ${Port} is up an running!`)
});