// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');

// ROUTES
const cohortRoutes = require('./cohorts/cohortRoutes.js');
const studentRoutes = require('./students/studentRoutes.js');

// SERVER
const server = express();

// MIDDLEWARE
server.use(express.json());
server.use(helmet());

// ENDPOINTS
server.use('/api/cohorts', cohortRoutes);
server.use('/api/students', studentRoutes);

// PORT
const port = 5000;
server.listen(port, function() {
	console.log(`\n=== Listening on http://localhost:${port} ===\n`);
});
