const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

server.get('/api/cohorts', (req, res) => {
db('cohorts')
    .then(cohorts => {
    res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json({ errorMessage: 'The cohorts information could not be retrieved.' }));
})
    
server.post('/api/cohorts', (req, res) => {
const cohort = req.body;

db.insert(cohort)
    .into('cohorts')
    .then(id => {
    res.status(201).json(id);
    })
    .catch(err => res.status(500).json({ errorMessage: 'There was an error while saving the post to the database. Maybe that record already exists.' }));
});

server.put('/api/cohorts/:id', (req, res) => {
const changes = req.body;
const { id } = req.params;

db('cohorts')
    .where('id', '=', id)
    .update(changes)
    .then(count => {
    res.status(200).json({ message: `Update succesful. ${count} record(s) updated.` })
    })
    .catch(err => {
    res.status(500).json({ errorMessage: 'Update failed.'})
    });
});

server.delete('/api/cohorts/:id', (req, res) => {
const { id } = req.params;

db('cohorts')
    .where({ id })
    .del()
    .then(count => {
    res.status(200).json({ message: `${count} record(s) deleted.`})
    })
    .catch(err => {
    res.status(500).json({ errorMessage: 'Oops! There was an error when trying to delete the record.' })
    });
});

//==============TESTING IF API IS RUNNING=============
server.get('/', (req, res) => {
    res.send('API Running...');
  });

const port = 3500;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
