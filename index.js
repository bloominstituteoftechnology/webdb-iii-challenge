const express = require('express');

// global middleware
const applyGlobalMiddleware = require('./config/middleware/global.js');

// routes
const { cohortRoutes } = require('./routes/index.js');

// port
const port = 5000;

const server = express();
applyGlobalMiddleware(server);

// endpoints
server.use('/api/cohorts', cohortRoutes);

server.listen(port, () => { console.log(`\n=== Listening on port ${ port } ===`) });
