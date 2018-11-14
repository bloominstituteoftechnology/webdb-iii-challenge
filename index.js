const express = require('express');
const helmet = require('helmet');

const cohortRouter = require('./routers/cohortRouter.js');
//const studentRouter = require('./routers/studentRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortRouter);
//server.use('/api/students', studentRouter);


server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});