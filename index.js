const express = require('express');
const cohortRoutes = require('./routes/cohorts/cohortRoutes.js');
const studentRoutes = require('./routes/students/studentRoutes.js');

const server = express();

server.get('/', (req, res) => {
  res.send('API running...')
});

server.use('/api/cohorts', cohortRoutes);
server.use('/api/students', studentRoutes);

const port = 4400;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
