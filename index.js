const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

/*
WORK IN PROGRESS:
*/

/*
DONE:

- [GET] /api/cohorts -->                        This route will return an array of all cohorts.
- [GET] /api/cohorts/:id -->                    This route will return the cohort with the matching id.
- [GET] /api/cohorts/:id/students -->           returns all students for the cohort with the specified id.
- [POST] /api/cohorts -->                       This route should save a new cohort to the database.
- [PUT] /api/cohorts/:id -->                    This route will update the cohort with the matching id using information sent in the body of the request.
- [DELETE] /api/cohorts/:id -->                 This route should delete the specified cohort.
*/

server.get('/', (req, res) => {
  res.send('Hello World');
});





server.get('/api/cohorts', (req, res) => {
  db('cohorts')
  .then(cohorts => {
    
    if (!cohorts || cohorts.length < 1) {
      res.status(404).json({ missingError: 'Hmm... It Seems All the Cohorts are on Vacation! Come back soon or try again!' });
    } else {
      res.status(200).json(cohorts);
    }

  })
  .catch(err => res.status(500).json(err));
});







server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts').where({ id }).first()
    .then(cohorts => {

      if (cohorts) {
        res.status(200).json(cohorts);
      } else if (!cohorts || cohorts.length < 1) {
        res.status(404).json({ missingError: 'Invalid ID, or the specified cohort no longer exists ;-;' });
      };

    })
    .catch(err => res.status(500).json(err));
});


server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;

  db('students').where({ id }).first()
    .then(students => {
      if (students) {
        res.status(200).json(students);
      } else if (!students || students.length < 1) {
        res.status(404).json({ missingError: 'Invalid ID, or the specified cohort no longer exists ;-;' });
      };
    });
});

server.post('/api/cohorts', (req, res) => {
  const { name } = req.body;

  db.insert({ name })
    .into('cohorts')
    .then(cohort => {
      if (!req.body.name) {
        res.status(400).json({ fillError: 'Please create a name' });
      } else {
        res.status(201).json(cohort);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('cohorts').where({ id }).update(changes)
  .then(countOfRecordsChanged => {


    if (countOfRecordsChanged < 1 || !countOfRecordsChanged) {
      res.status(404).json({ missingError: 'Could Not Find Given ID' });
    } else {
      res.status(200).json(countOfRecordsChanged);
    }

  })
  .catch(err => res.status(500).json(err));
});




server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts').where({ id }).del()
    .then(countOfRecordsChanged => {


      if (countOfRecordsChanged < 1 || !countOfRecordsChanged) {
        res.status(404).json({ missingError: 'Could Not Find Given ID' });
      } else {
        res.status(200).json(countOfRecordsChanged);
      }

    })
    .catch(err => res.status(500).json(err));
})





























const port = 4402;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
})