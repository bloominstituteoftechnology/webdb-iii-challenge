const express = require('express')
const cohortsRoute = require('./api/cohortsRoute')
const studentsRoute = require('./api/studentsRoute')

const server = express()

server.use(express.json())

server.use('/api/cohorts', cohortsRoute)
server.use('/api/students', studentsRoute)

server.listen(8000, () => console.log('active on port 8000'))
