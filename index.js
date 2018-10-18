const express = require('express');
const helmet = require('helmet');

const cohortRoutes = require('./Cohorts/CohortRoutes.js');
const studentRoutes = require('./Students/StudentRoutes.js');


const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's Alive");
});

server.use('/api/cohorts', cohortRoutes);
server.use('/api/students', studentRoutes);

server.listen(9000, () => console.log('\nAPI running on 9k\n'));