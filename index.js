const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development)

const server = express();

server.use(helmet());
server.use(express.json());

// sanity check endpoint
server.get('/', (req, res) => {
  res.send("It's Alive");
});

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
      .select('id','name')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
  });

  server.get('/api/cohorts/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const cohort = await db('cohorts').where({id});
  
      if (cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'cohort not found' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  server.post('/api/cohorts', (req, res) => {
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

  server.put('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db('cohorts')
      .where({ id: id })
      .update(changes)
      .then(count => {
        if (!count || count < 1) {
          res.status(404).json({ message: 'No records found to update' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });

  server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
  
    db('cohorts')
      .where({ id })
      .delete(id)
      .then(count => {
        if (!count || count < 1) {
          res.status(404).json({ message: 'No records found to delete' });
        } else {
          res.status(200).json(count);
        }
      })
      .catch(err => res.status(500).json(err));
  });

  server.get('/api/cohorts/:id/students', (req, res) => {    
   
      const { id } = req.params;
      db('students').where('cohort_id', '=',id)
        .then(students => {
  
      if (students) {
        res.status(200).json(students);
        
      } else {
        res.status(404).json({ message: 'students not found' });
      }
    } 
  )
  .catch(err => console.error(err));
  })
server.listen(5000, () => console.log('running on port 5000'));