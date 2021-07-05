// Imports
const express = require('express');
const middlewareConfig = require('./middleware/middlewareConfig.js');
const cohortRoutes = require('./routes/cohortRoutes.js');
const studentRoutes = require('./routes/studentRoutes.js');

// Creates the server
const server = express();

// Middleware
middlewareConfig(server);

// End points
server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

server.use('/api/cohorts', cohortRoutes);
server.use('/students', studentRoutes);

const port = 8000;
server.listen(port, () => {
  console.log(`===== Server listening on port ${port}. =====`);
});
