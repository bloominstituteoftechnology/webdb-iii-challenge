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

server.post('/api/courses', (req, res) => {
    const course = req.body;
    db.insert(course)
      .into('courses')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json(err));
  });
  
  server.get('/api/courses', (req, res) => {
    db('courses')
      .then(courses => {
        res.status(200).json(courses);
      })
      .catch(err => res.status(500).json(err));
  });
  
  server.listen(8000);