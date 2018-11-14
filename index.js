// Imports
const express = require('express');
const middlewareConfig = require('./middleware/middlewareConfig.js');
const cohortRoutes = require('./routes/cohortRoutes.js');

// Creates the server
const server = express();

// Middleware
middlewareConfig(server);

// End points
server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

server.use('/api/cohorts', cohortRoutes);

const port = 8000;
server.listen(port, () => {
  console.log(`===== Server listening on port ${port}. =====`);
});
