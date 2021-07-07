// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');


// ROUTES
const cohortRoutes = require('./cohorts/cohortRoutes.js');

// SERVER
const server = express();

// MIDDLEWARE
server.use(express.json());
server.use(helmet());

// ENDPOINTS
server.use('/api/cohorts', cohortRoutes);

// PORT
const port = 4000;
server.listen(port, () => console.log(`\n ===== Listening at port ${port} ===== \n`));