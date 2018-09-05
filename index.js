const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const cohortRoutes = require('./routes/cohortRoutes');
const studentRoutes = require('./routes/studentRoutes');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/cohorts', cohortRoutes);
server.use('/api/students', studentRoutes);

server.get('/', (req, res) => {
  res.send('It works mon');
});

const port = 3800;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} mon ===\n`);
});
