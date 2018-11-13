const express = require('express');
const helmet = require('helmet');
const knex= require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development); 

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's Alive!");
})

server.get('/api/cohorts', (req, res) => {
    db('cohorts')
    .then(names => {
      console.log(names)
      res.status(200).json(names)
    })
    .catch(err => {
      res.status(500).json(err)
    });
  });
  

server.listen(7000, () => console.log('\n Party at part 7k '))