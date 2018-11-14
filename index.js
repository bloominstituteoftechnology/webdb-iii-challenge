const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

server.use(express.json());
server.use(helmet());

server.get('/students', (req, res) => {
    db('students')
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => {
        res.status(500).json(err)
      })
})

server.get('/students/:id', (req, res) => {

    const { id } = req.params

    db('students')
    .where({id})
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => {
        res.status(500).json(err)
      })
})

server.post('/students', (req, res) => {
    const student = req.body
    db('students')
    .insert(student)
    .then(ids => {
        res.status(201).json(ids)
        .catch(err => {
            res.status(500).json(err)
          })
    })
})

// =============================================

server.get('/cohorts', (req, res) => {
    db('cohorts')
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json(err)
      })
})

server.get('/cohorts/:id', (req, res) => {

    const { id } = req.params

    db('cohorts')
    .where({id})
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .catch(err => {
        res.status(500).json(err)
      })
})

server.get('/cohorts/:id/students', (req, res) => {

    const { id } = req.params

    db('cohorts')
    .where({id})
    .then(cohorts => {
        res.status(200).json(cohorts)
    })
    .then(students => {
        res.status(200).json(students)
    })
    .catch(err => {
        res.status(500).json(err)
      })
})


server.post('/cohorts', (req, res) => {
    const cohort = req.body
    db('cohorts')
    .insert(cohort)
    .then(ids => {
        res.status(201).json(ids)
        .catch(err => {
            res.status(500).json(err)
          })
    })
})

server.put('/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db('cohorts')
    .where({id})
    .update(changes)
    .then(count => {
        res.status(200).json(count)
        .catch(err => {
            res.status(500).json(err)
        })
    })
})



const port = 4300;
server.listen(port, function() {
  console.log(`\n==^_^== Listening on http://localhost:${port} ==^_^==\n`);
});
