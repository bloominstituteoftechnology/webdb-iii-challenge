const express = require('express')
const server = express()

const cohortsRouter = require('./routes/cohortsRouter.js')
const studentsRouter = require('./routes/studentsRouter.js')

server.use(express.json())

server.get('/', (req, res) => {
  res.status(200).json({ api: 'ok' })
})

server.use('/api/cohorts/', cohortsRouter)
server.use('/api/students/', studentsRouter)

module.exports = server
