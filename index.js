const express = require('express')
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();
const port = 9000;
server.use(express.json());


server.get('/', (req, res) => {
    res.json({ api: 'running properly' });
});

// GET Requests

server.get('/api/cohorts', (req,res) => {
    db('cohorts')
    .then(cohort => res.status(200).json(cohort))
    .catch(err => res.status(500).json(err));
})

server.listen(port, () => {console.log(`Server Running on Port ${port}`)})