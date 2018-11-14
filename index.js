const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.json({ api: 'api is alive!'});
});

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(error => res.status(500).json({ message: "failed to get cohorts"}))
})

server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    db('cohorts')
    .where({ id: id })
    .then(cohorts => res.status(200).json(cohorts))
    .catch(error => res.status(500).json({ message: "No cohort by that ID found"}))
})




const port = 4000;
server.listen(port, function() {
    console.log(`\n===Web API Listening on http://localhost:${port}===\n`)
})