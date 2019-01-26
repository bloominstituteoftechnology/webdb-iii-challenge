const express = require('express')

const server = express()
server.use(express.json())

//Routes

const cohortsRoute = require('./data/routes/cohortsRoute')


server.use('/api/cohorts', cohortsRoute)


const port = 5434;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});