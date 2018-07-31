const express = require('express');

const db = require('../db')

const user = express.Router();

user.get('/', (req,res) => {
  db('users')
    .then( user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
})

user.get('/:id', (req,res) => {
  const id = req.params.id

  db('users')
  .where({id})
    .then( user => {
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json(err))
})

user.post('/', (req,res) => {
  const user = req.body

  db.insert(user)
    .into('users')
    .then( data => {
      if (data.length === 1){
        res.status(201).json({message: `1 user added with ID = ${data[0]}`})
      }
    })
    .catch(err => res.status(500).json(err))
})


module.exports = user