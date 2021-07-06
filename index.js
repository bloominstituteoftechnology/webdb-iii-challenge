const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();

const db = knex(knexConfig.development);

server.use(express.json());


server.get('/api/cohorts', (req, res) => {
    db('cohorts').then(cohort => {
        res.status(201).json(cohort)
        
    }).catch(err => res.status(500).json(err))
});

server.get('/api/cohorts/:id', (req, res) => {
    const id = req.params.id-1
    db('cohorts').get(id).then(cohort => {
        res.status(201).json(cohort)
        
    }).catch(err => res.status(500).json(err))
});

server.post('/api/cohorts', (req, res) => {
    db('cohorts')
    .insert(req.body)
    .then(cohort => {
        res.status(201).json(cohort)
    }).catch(err => res.status(500).json(err))
});

server.get('/api/cohorts/:id/students', (req, res) => {
    const id = req.params.id - 1;
    db('cohorts').get(id).then(student => {
        res.status(201).json(student)
        
    }).catch(err => res.status(500).json(err))
});



server.put('/api/cohorts/:id', async (req, res) => {
    const id = req.params.id - 1;
    const changes = req.body;
  
    try {
      const result = await db('cohorts').update(id, changes);
  
      res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
  })

  server.delete('/api/cohorts/:id', (req, res) => {
    const id = req.params.id -1;
    db.get(id)
      .then(cohort => {
        if(cohort) {
          db('cohorts').remove(id).then(count => {
            res.status(200).json(cohort);
        });
        } else {
          res
            .status(404)
            .json({ message: 'The cohort with the specified ID does not exist'});
      }
    })
      .catch(err => res.status(500).json(err))
  })







server.listen(3400, () => {
    console.log('Server is up on 3400')
})