const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(helmet());

const cohortRoute = require('./routes/cohortRoute');

server.use('/api/cohorts', cohortRoute);

//sanity check endpoint
server.get('/', (req, res) => {
  res.send('it lives!');
});

const port = 3300
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
})
