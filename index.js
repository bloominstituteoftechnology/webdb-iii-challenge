const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();


server.use(helmet());
server.use(express.json());

// Add home route
server.get('/', (req, res) => {
  res.send("You are Home!");
});

// ==============================COHORTS ENDPOINTS=====================================

// Add GET ROUTE HANDLER to get the list of cohorts
server.get('/api/cohorts', (req, res) => {
  db('cohorts')
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err));
});

// Add GET ROUTE HANDLER to get a cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
  try{
    const { id } = req.params;

    const cohort = await db('cohorts')
      .where({ id })
      .first();

    if (cohort) {
      res.status(200).json(cohort);
    } else {
      res.status(404).send({ error: "Cohort id does not exist. Please provide a valid cohort id." });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add POST ROUTE HANDLER to create a cohort
server.post('/api/cohorts', (req, res) => {
  if (!req.body.name){
    return res.status(400).send({ error: "Please provide a name for this cohort." });
  }
  const cohort = req.body;

  db.insert(cohort)
    .into('cohorts')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Add DELETE ROUTE HANDLER to delete a cohort
server.delete('/api/cohorts/:id', async (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where ({ id })
    .del()
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete.'});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
  });

//Add PUT ROUTE HANDLER to update a cohort's name
server.put('/api/cohorts/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('cohorts')
    .where ({ id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: "No records found to update."});
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
  });

  // ==============================STUDENTS ENDPOINTS=====================================

// Add GET ROUTE HANDLER to get all students who are in a specified cohort by id
server.get('/api/cohorts/:id/students', (req, res) => {
  
    const { id } = req.params;

    db('students')
      .where({cohort_id: id})
      .then(student => {
        if(!student || student.length < 1){
          res.status(404).json({error: `Could not find any students in this cohort.`})
      } else {
      res.status(200).json(student);
      }
    })
      .catch(error => {res.status(500).json(error)});

});

server.listen(8800, () => console.log('\n===API running on 8800===\n'));