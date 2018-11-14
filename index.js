// NODE MODULES
// ==============================================
const express = require('express');
const helmet = require('helmet');

// FILE IMPORTS, CONSTANTS
// ==============================================
const cohortRouter = require('./routes/cohortRoutes.js');
const studentRouter = require('./routes/studentRoutes.js');
const port = 3300;

const server = express();

// MIDDLEWARE
// ==============================================
server.use(express.json());
server.use(helmet());

// ROUTES
// ==============================================
server.use('/api/cohorts', cohortRouter);
server.use('/students', studentRouter);

// START THE SERVER
// ==============================================
server.listen(port, () => console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`));
