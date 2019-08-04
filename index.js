const express = require('express');
const helmet = require('helmet');
const port = 7100;
const name = `RDBMS-API-Full`;
const cohortsRoutes = require('./routes/cohortsRoutes');
const studentsRoutes = require('./routes/studentsRoutes');
const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`${name} running on port ${port}`);
});

server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

server.listen({ port }, () => console.log(`## ${name} running on port ${port} ##`));