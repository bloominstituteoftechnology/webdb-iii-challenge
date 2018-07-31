const express = require('express');

const users = require('./userRouter')

const api = express.Router();

api.get('/', (req,res) => {
  res.send('Welcome to the API!')
})

api.use('/users', users);
// api.use('/proj', proj);

module.exports = api;