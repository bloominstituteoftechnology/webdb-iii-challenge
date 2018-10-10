const express = require('express');
const helmet = require('helmet');

const cohortsRoutes = require('./cohorts/cohortsRoutes');
const studentsRoutes = require('./students/studentsRoutes');

const port = 8000;

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());

// ROUTES
server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
