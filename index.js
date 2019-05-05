const express = require('express');
const knex = require('knex')

const dbConfig = require('./knexfile')

const server = express();
const db = knex(dbConfig.development);
const PORT = 5555;

server.use(express.json());

server.get('/cohorts', (req, res) => {
    db('cohorts').then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err:"Failed to find cohorts"})
    })
});


server.post('/cohorts', (req, res) => {
    const cohort = req.body;
    db('cohorts').insert(cohort)
    .then(ids => {
        res.status(201).json(ids)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err:"Error"})
    })
})

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})