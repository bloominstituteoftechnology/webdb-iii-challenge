const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Api running...')
});

server.get('/api/cohorts', (req, res) => {
  db('cohorts').then(cohorts => {
    res.status(200).json(cohorts)
  }).catch(err => {
    res.status(500).json({ message: 'Sorry, the server could not be reached'})
  })
});

server.post('/api/cohorts', (req, res) => {
  if (req.body) {
    db.insert(req.body).into('cohorts').then(ids => {
      res.status(201).json(ids);
    }).catch(err => {
      res.status(500).json(err);
    })
  }
  else {
    res.status(422).json({ message: 'Please provide a name for the cohort!'});
  }
});

server.get('/api/cohorts/:id', (req, res) => {
  db('cohorts').where('id', parseInt(req.params.id)).then(cohort => {
    if (cohort === []) {
      res.status(404).json({ message: 'A cohort with the provided id could not be located'});
    }
    else {
      res.status(200).json(cohort);
    }
  }).catch(err => {
    res.status(500).json({ message: 'Server could not be reached, please try again'});
  })
});

server.put('/api/cohorts/:id', (req, res) => {
  db('cohorts').where('id', parseInt(req.params.id)).update(req.body).then(ids => {
    res.status(201).json({ message: 'The cohort has been successfully updated!'});
  }).catch(err => {
    res.status(500).json({ message: 'There was an error reaching the server - please try again!'});
  })
});

server.delete('/api/cohorts/:id', (req, res) => {
  db('cohorts').where('id', parseInt(req.params.id)).del().then(id => {
    res.status(200).json({ message: 'The cohort has been deleted'});
  }).catch(err => {
    res.status(500).json({ message: 'There was an error, please try deleting again'})
  })
})

server.get('/api/cohorts', (req, res) => {

})

server.listen(7000);
