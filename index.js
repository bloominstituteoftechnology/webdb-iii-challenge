const express = require('express');
const helmet = require('helmet');
const cohortsRoutes = require('./cohortsRoutes/cohortsRoutes.js');
const studentsRoutes = require('./studentsRoutes/studentsRoutes.js');

const server = express();

server.use(express.json());
server.use(helmet());


server.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>');
});

server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);


const port = 9000;
server.listen(port, () => {
  console.log(`API is listening on port ${port}.`);
});