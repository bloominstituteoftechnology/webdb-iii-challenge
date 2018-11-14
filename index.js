const express = require('express');
const helmet = require('helmet');
const knex= require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development); 

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's Alive!");
})

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(names => {
      console.log(names)
      res.status(200).json(names)
    })
    .catch(err => {
      res.status(500).json(err)
    });
  });

server.post('/api/cohorts', (req, res) => {
  const name = req.body;
   db
   .insert(name) 
   .into('cohorts')
  .then(name => {
    res.status(200).json(name[0])
  })
  .catch(err => {
    res.status(500).json(err)
  });
})

server.get('/api/cohorts/:id', (req, res) => {
    db('cohorts')
      .where({ id: req.params.id })
      .first()
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => 
      res.status(500).json(err));
  });

server.put('/api/cohorts/:id', (req, res) => {
    const cohort = req.body;
    db('cohorts')
      .where({ id: req.params.id })
      .update(cohort)
      .then(cohort => {
        if (cohort) {
          res.status(200).json({ message: "Successfully Updated." });
        } else {
          res.status(404).json({ message: "No cohort associated with this ID" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Sorry, we could not update this cohort." });
      });
  });

  server.delete('/api/cohorts/:id', (req, res) => {
    db('cohorts')
      .where({ id: req.params.id })
      .del()
      .then(count => {
        if (count) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: "No cohort associated with this ID" });
        }
      })
      .catch(err => res.status(500).json(err));
  });


  server.get('/api/students', (req, res) => {
    db('studentstwo')
    .then(names => {
      console.log(names)
      res.status(200).json(names)
    })
    .catch(err => {
      res.status(500).json(err)
    });
  });


  server.get('/api/students/:id', (req, res) => {
    db('studentstwo')
      .where({ id: req.params.id })
      .first()
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => 
      res.status(500).json(err));
  });

server.listen(7000, () => console.log('\n Party at part 7k '))