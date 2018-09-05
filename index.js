const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');


const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('API running....')
});


// Cohorts CRUD operations goes here

server.get('/api/cohorts', (req, res) => {
    db('cohorts').then(cohorts => {
        res.status(201).json(cohorts);
    })
    .catch(error => {
        res.status(500).json(error);
    })
  });
  
  server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    // Using knex
    db('cohorts')
      .select()
      .where('id', id)
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(error => {
        res.status(500).json(error)
      })
  });

  server.get('/api/cohorts/:id/students', (req, res) => {
    const {id} = req.params;
    // Using knex
    db('students')
      .select()
      .where('cohort_id', id)
      .then(students => {
        res.status(200).json(students);
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })
  
  server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db.insert(cohort).into('cohorts')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => res.status(500).json(error))
  });
  
  server.delete('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    // Using Knex
    db('cohorts')
      .where({id})
      .del()
      .then( cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  });
  
  server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const name = req.body;
    // Using Knex
    db('cohorts')
      .where({id})
      .update(name)
      .then( cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  });
  
  
  
  // Students CRUD operations goes here
  
  server.get('/api/students', (req, res) => {
    db('students').then(students => {
        res.status(201).json(students);
    })
    .catch(error => {
        res.status(500).json(error);
    })
  });
  
  server.get('/api/students/:id', (req, res) => {
    const {id} = req.params;
    // Using knex
    db('students')
      .select()
      .where('id', id)
      .then(students => {
        res.status(200).json(students);
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })
  
  server.post('/api/students', (req, res) => {
    const student = req.body;
    db.insert(student).into('students')
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => res.status(500).json(error))
  });
  
  server.delete('/api/students/:id', (req, res) => {
    const {id} = req.params;
    // Using Knex
    db('students')
      .where({id})
      .del()
      .then( students => {
        res.status(200).json(students);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  });
  
  server.put('/api/students/:id', (req, res) => {
    const {id} = req.params;
    const name = req.body;
    // Using Knex
    db('students')
      .where({id})
      .update(name)
      .then( students => {
        res.status(200).json(students);
      })
      .catch(error => {
        res.status(500).json(error);
      })
  });

server.listen(9000);