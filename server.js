const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());



server.get('/', (req, res) => {
  res.send('API Running...');
});


server.get('/api/cohorts', (req, res) => {
  db('cohorts').select('name')
  .then(cohorts => {
    cohorts.length === 0 ?
    res.status(200).json({message: 'No Cohorts Listed, Send a Post request to list a Cohort'})
    :
    res.status(200).json(cohorts)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


server.get('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;

  db('cohorts').where({ id }).select('name')
  .then(zoo => {
    zoo.length === 0 ?
    res.status(400).json({message: 'No Cohorts Listed, check your id'})
    :
    res.status(200).json(zoo)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json('Error')
  });
});


server.post('/api/cohorts', (req, res) => {
  !req.body.name ?
  res.status(400).json({message: 'You need a valid name'})
  :
  null
  const name = req.body;
  db.insert(name).into('cohorts')
  .then(count => {
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


server.delete('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where({id}).del()
  .then(count => {
    count === 0 ?
    res.status(400).json({message: 'Error deleting Cohort, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


server.put('/api/cohorts/:id', (req, res) => {
  const { id } = req.params;
  !req.body.name ?
  res.status(400).json({message: 'You need a valid name'})
  :
  null
  const name = req.body;
  db('cohorts').where({id}).update(name)
  .then(count => {
    count === 0 ?
    res.status(400).json({message: 'Error updating Cohorts, check your id'})
    :
    res.status(200).json(count)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json('Error')
  });
})


server.listen(8000, () => console.log('OI'));
