const express = require("express")
const knex = require("knex")
const helmet = require('helmet')
const cors = require('cors'); 
const server = express(); 
const dbConfig = require('./knexfile')
const db = knex(dbConfig.development); 
const PORT = 6000;

server.use(express.json(), cors(), helmet());

server.get('/api/cohorts', (req, res) => {
    db('cohorts').then(cohorts => {
      res.status(200).json(cohorts)
    })
    .catch( err => { res.status(500).json({err: "there was an error"})
  })
})

server.get('/api/cohorts/:id', (req, res) => {
    const {id} = req.params
    db('cohorts').where({id}).then(id => {
      res.status(201).json(id); 
    })
    .catch(err => { res.status(500).json({err: "there was an error"})
  })
})

server.get('/api/cohorts/:id/students', (req, res) => {
    const {id} = req.params
})