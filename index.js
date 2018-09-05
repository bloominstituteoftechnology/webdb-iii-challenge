const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('API Running')
})

server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    db.insert(cohort)
      .into('cohorts')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json(err));
  });
  
  server.get('/api/cohorts', (req, res) => {
    db('cohorts')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
  });
  
  server.get('/api/cohorts/:id', (req, res) => {
    const {idReq} = req.params
    db('cohorts').where('cohort_id', {idReq}).select(cohort)
      .then(cohort => {
        // console.log('then')
        // let cohort = allCohorts.find(eachCohort => {
        //   console.log("find",req.params.id, eachCohort.cohort_id)
        //      return req.params.id == eachCohort.cohort_id
        // })
        // console.log(cohort, "cohort")
        res.status(200).json(cohort);
      })
      .catch(err => res.status(500).json(err));
  });

//   Key, Value:

// knex('users').where('id', 1)
// Outputs:
// select * from `users` where `id` = 1

server.get('/api/cohorts/:id/students', (req, res) => {
  const {idReq} = req.params
  db('students').where('cohort_id', {idReq}).select(student)
    .then(student => {
      // console.log('then')
      // let cohort = allCohorts.find(eachCohort => {
      //   console.log("find",req.params.id, eachCohort.cohort_id)
      //      return req.params.id == eachCohort.cohort_id
      // })
      // console.log(cohort, "cohort")
      res.status(200).json(student);
    })
    .catch(err => res.status(500).json(err));
});
  
  server.listen(8000);