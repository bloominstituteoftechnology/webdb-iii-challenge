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

module.exports = user