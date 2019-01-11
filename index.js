const express = require('express');
const server = express();
const db = knex(dbConfig.development);
const dbConfig = reqiuire('./knexfile');


const PORT = process.env.PORT || 3300;

server.use(express.json());

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
});

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

});

server.put('/api/cohorts/:id', (req, res) => {

});

server.delete('/api/cohorts/:id', (req, res) =>{

});

// STRETCH PROBLEM STUDENTS
server.post('/api/students', (req, res) => {

});

server.get('/api/students', (req, res) => {

});

server.get('/api/students/:id', (req, res) => {

});

server.put('/api/students/:id', (req, res) => {

});

server.delete('/api/students/:id', (req, res) =>{

});

server.listen(PORT, () => {
   console.log('it is aliiiiiive')
});
