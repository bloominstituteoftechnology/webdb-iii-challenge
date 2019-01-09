const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);
const PORT = 8000;

server.use(express.json());

server.post('/dev.sqlite3', (req, res) => {
    const cohorts = req.body;
    console.log('cohorts info', cohorts)
    db('dev.sqlite3').insert(cohorts)
        .then(ids => {
            res.status(201).json(ids);
        }).catch(err => {
            res.status(500).json({err: 'Failed to insert'})
    });
});

//GET REQUESTS
server.get('/api/cohorts', (req, res) => {
    db('cohorts').then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json({err: "Can't get data"})
    })
})

server.get('/api/students', (req, res) => {
    db('students').then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json({err: "Can't get data"})
    })
})

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})

