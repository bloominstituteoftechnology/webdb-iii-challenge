const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('API Running?');
});

// cohort endpoints -----------------------------------------
// add a cohort
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: 'The cohort name is required, please enter the name and try again.' });
        return;
    }

    // insert into cohorts () values ()
    // db('cohorts').insert(cohort).then().catch()
    db.insert(cohort)
      .into('cohorts')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json(err));
});
  
// get all the cohorts
server.get('/api/cohorts', (req, res) => {
    db('cohorts')
      // .select('name')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
});

// get a specific cohort
server.get('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
  
    db('cohorts')
      .where('id', '=', id)
      .then(cohort => {
          // console.log(cohort);
          if (!cohort) {
              res.status(404).json({ message: 'The cohort with the specified ID does not exist.' });
              return;
          }
          res.status(200).json(cohort);
      })
      .catch(err => {
          console.error('error', err);
          res.status(500).json({ error: 'The cohort information could not be retrieved.'})
    })
});

// student endpoints -----------------------------------------
// add a student
server.post('/api/students', (req, res) => {
    const student = req.body;
    const { name } = req.body;
    if (!name) {
        res.status(400).json({ errorMessage: 'The student name is required, please enter the name and try again.' });
        return;
    }
  
    // insert into students () values ()
    // db('students').insert(student).then().catch()
    db.insert(student)
      .into('students')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json(err));
});
  
server.get('/api/students', (req, res) => {
    db('students')
      // .select('name')
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => res.status(500).json(err));
});

const port = 3400;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});