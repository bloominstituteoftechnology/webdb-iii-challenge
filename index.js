const express = require('express')
const db = require('./data/db')
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
  res.send('up & running...')
})

server.get('/users', (req, res) => {
  db('users')
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => res.status(500).json(err))
})

server.listen(8000, () => console.log('API RUNNING'))
