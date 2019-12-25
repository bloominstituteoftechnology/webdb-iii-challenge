const express = require('express');
const helmet = require('helmet');

const cohortsRoutes = require('./cohorts/cohortsRoutes.js');

const server = express();

server.use(helmet());
server.use(express.json());


server.get('/', (req, res) => {
  res.send("API is running");
});

server.use('/api/cohorts', cohortsRoutes);

const port = 9000;

server.listen(port, () => {
    console.log(`\nAPI running on port ${port}\n`)
});