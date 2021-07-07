const express = require('express');
const helmet = require('helmet');

const cohortsRoute = require('./cohorts/cohortsRoutes.js');
const studentsRoute = require('./students/studentsRoutes.js');

const server = express();

server.use(helmet());
server.use(express.json());

//sanity check endpoint
server.get('/', (req, res) => {
    res.send("It's allliiiiiiiiive!!!");
});

server.use('/api/cohorts', cohortsRoute);
server.use('/api/students', studentsRoute);

const port = 8888;
server.listen(port, () => console.log(`***API running on ${port}`));