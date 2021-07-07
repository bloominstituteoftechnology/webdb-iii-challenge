const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile');

const server = express();
server.use(express.json());
server.use(helmet());

const cohortRoute = require('./routes/cohortRoute');
const studentRoute = require('./routes/studentRoute'); 

server.use('/api/cohorts', cohortRoute);
server.use('/api/students', studentRoute);

//sanity check endpoint
server.get('/', (req, res) => {
  res.send('it lives!');
});

const port = 3300
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
