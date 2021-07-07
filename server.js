const express = require('express');
const helmet = require('helmet');

const cohortRoutes = require('./cohorts/cohortRoutes')
const studentRoutes = require('./students/studentRoutes')

const server = express();

server.use(express.json());
server.use(helmet());


server.get('/', (req, res) => {
  res.send('API Running...');
});


server.use('/api/cohorts', cohortRoutes);
server.use('/api/students', studentRoutes);


server.listen(8000, () => console.log('OI'));
