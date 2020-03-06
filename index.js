const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());


// ___________ POST Cohort_______________
//[POST] /api/cohorts This route should save a new cohort to the database.
server.post('/api/cohorts', (req, res) => {
  const cohort = req.body;
  db('cohorts_table')
    .insert(cohort)
    //.returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })

    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});


// ___________ GET Cohort_______________
//[GET] /api/cohorts This route will return an array of all cohorts.
//[GET] /api/cohorts/:id This route will return the cohort with the matching id.
//[GET] /api/cohorts/:id/students returns all students for the cohort with the specified id.

server.get('/api/cohorts', (req, res) => {
  db('cohorts_table')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json(err));
});

server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts_table')
  .where({ id:id })
  .then(cohort => { 
    if (!cohort ) { 
    res.status(404).json({ message: "The cohort with the specified ID does not exist." });
    return  
    } else if (!cohort.length) { 
     res.status(404).json({ message: "The cohort with the specified ID does not have any actions yet." });
     return  
     } else if (cohort && cohort.length){ 
    res.status(200).json(cohort);
    return  
    }
  })
  .catch(err => {
    res 
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  });
});

server.get('/api/cohorts/:id/students', (req, res) => {
    const { id } = req.params;
    db('students_table')
    .where({ cohort_id:id })
    .then(cohort => { 
    if (!cohort ) { 
      res.status(404).json({ message: "The cohort with the specified ID does not exist." });
      return  
      } else if (!cohort.length) { 
       res.status(404).json({ message: "The cohort with the specified ID does not have any actions yet." });
       return  
       } else if (cohort && cohort.length){ 
      res.status(200).json(cohort);
      return  
      }
    })
    .catch(err => {
      res 
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
  });

// ___________ PUT Cohort______________
//[PUT] /api/cohorts/:id This route will update the cohort with the matching id
        // using information sent in the body of the request.

server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  
  db('cohorts_table')
    .where({ id:id })
    .update(changes)
    .then(cohort => {
      if (!cohort ) { 
        res.status(404).json({ message: "The cohort with the specified ID does not exist." });
        return  
        } else if (!cohort.length) { 
         res.status(404).json({ message: "The cohort with the specified ID does not have any actions yet." });
         return  
         } else if (cohort && cohort.length){ 
        res.status(200).json(cohort);
        return  
        }
    })
    .catch(err => res.status(500).json(err));
});

// ___________ DELETE Cohort _______________
//[DELETE] /api/cohorts/:id This route should delete the specified cohort.
server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts_table')
    .where({ id:id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


const port = 4400;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
