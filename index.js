const express = require('express');
const helmet = require('helmet');
const cohortsRoutes = require('./cohortsRoutes/cohortsRoutes.js');
const studentsRoutes = require('./studentsRoutes/studentsRoutes.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

// SERVER PORT

const port = 6000;
server.listen(port, () => console.log(`API is listening on port ${port}.`));
