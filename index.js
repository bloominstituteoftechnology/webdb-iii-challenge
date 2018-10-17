const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);


const server = express();


server.use(helmet())
server.use(express.json());

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    	.then(cohorts => res.status(200).json(cohorts))
      .catch(err => res.status(404).json({error: `Server error --> ${err}`}))
});

//Gets the cohort with specific id
server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({id})
    	.then(response => {
        response.length ? res.status(200).json(response) : res.status(404).json({ error: "No cohort with that id." })        
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}`}))
});

// Getting the students from the cohort
server.get('/api/cohorts/:id/students', (req, res) => {
  const { id } = req.params;

  db('students')
    .where({ cohort_id: id })
      .then(response => {
        response.length ? res.status(200).json(response) : res.status(404).json({ error: "No students in this cohort." })
      })
      .catch(err => console.log(err))
});

server.post('/api/cohorts', (req, res) => {
  const addCohort = req.body;

  db('cohorts')
    .insert(addCohort)
    .into('cohorts')
    	.then(id => res.status(201).json({ id : id[0] }))
      .catch(err => res.status(500).json({ error: `Server error --> ${err}`}))
});

server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  const upCohort = req.body;

  db('cohorts')
    .where({id})
    .update(upCohort)
    	.then(response => {
        response ? res.status(200).json({ message: "Cohort Updated"}) : res.status(404).json({ error: "No cohort with that id." })
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}`}))
});

server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts')
    .where({id})
    .del()
    	.then(response => {
        response ? res.status(200).json({ message: "Cohort Deleted"}) : res.status(404).json({ error: "No cohort with that id." })
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}`}))
});



const port = 8000;
server.listen(port, () => console.log(`Sever running on ${port} port.`))