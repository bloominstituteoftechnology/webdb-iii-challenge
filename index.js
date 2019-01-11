const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    if (cohort.name) {
        db('cohorts').insert(cohort)
        .then(ids => {
            res.status(201).json(ids)
        })
        .catch(err => {
            res.status(500).json({err: 'Failed to insert cohort'})
        })
    }
})

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(arr => {
      if (arr.length > 0) {
      res.status(200).json(arr);
      } else {
       res.status(404).json({ error: 'No data to display.'})
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to get info.'})
    })
  });

  server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    db('cohorts').where('id', id)
    .then(arr => {
      if (arr.length > 0) {
      res.status(200).json(arr)
      } else {
        res.status(404).json({ error: 'No data for given id.'})
      }
    })
    .catch(err => {
     res.status(500).json({ error: 'Failed to get info.'})
     }) 
   });

   server.delete('/api/cohorts/:id', (req,res) => {
    const {id} = req.params;
    db('cohorts').where('id', id).del()
    .then(count => {
      res.status(200).json({ success: 'Cohort successfully deleted' })
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete cohort.' })
    })
  });

  server.put('/api/cohorts/:id', (req, res) => {
    const {id} = req.params;
    const cohort = req.body;
    if (cohort.name){ 
    db('cohorts').update(cohort)
    .then(count => {
      if (count) {
      res.status(200).json({ success: 'Updated cohort' });
      } else {
        res.status(404).json({ error: 'Cohort with that ID does not exist.' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update.'})
    })
    } else {
      res.status(400).json({ error: "Please provide a cohort name." })
    }
  });

  server.get('/api/cohorts/:id/students', (req, res) => {
    const {id} = req.params;
    db('students').where('cohort_id', id)
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: 'Failed to find those students in that cohort'})
    })
})


  const port = 3301;
  server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
  });
   

