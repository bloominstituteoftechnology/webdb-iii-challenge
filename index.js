const express = require('express')

const server = express()
server.use(express.json())

//Routes
const cohortsRoute = require('./data/routes/cohortsRoute')
const studentsRoute = require('./data/routes/studentsRoute')

server.use('/api/cohorts', cohortsRoute)
server.use('/api/students', studentsRoute)

//Listening

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});