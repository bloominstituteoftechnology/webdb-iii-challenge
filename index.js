const express = require('express');
const helmet = require('helmet');

const cohortsRoutes = require('./cohorts/cohortsRoutes');

const port = 8000;

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());

// ROUTES
server.use('/api/cohorts', cohortsRoutes);

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
