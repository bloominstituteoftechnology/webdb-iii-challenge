const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('Your API is running')
})

server.get('/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => res.status(200).json(cohorts))
        .catch(err => res.status(500).json({ errorMsg: 'Could not retrieve cohorts.' }))

})

server.get('/cohorts/:id', (req, res) => {
    const{ id }  = req.params

    db('cohorts')
        .where('id', '=', id)
        .then(cohort => {
            res.status(200).json(cohort)
        })
        .catch(err => res.status(500).json({ errorMsg: 'Unable to retrieve the cohort.' }))
})

server.get('/cohorts/:id/students', (req, res) => {
    const { id } = req.params;

    db('students')
        .where('id', '=', id)
        .then(student => {
            res.status(200).json(student)
        })
        .catch(err => {
            res.status(500).json({ errorMsg: 'Unable to find student with that id.' })
        })
})

server.post('/cohorts', (req, res) => {
    const cohort = req.body;

    if(!cohort.name){
        res.status(400).json({ errorMsg: 'A name is required to post.' })
    }
    db.insert(cohort)
    .into('cohorts')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ errorMsg: 'Could not add zoo to database.' }))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
