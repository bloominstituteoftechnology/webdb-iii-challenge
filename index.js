const express = require('express');
const helmet = require('helmet');

const cohortsRoutes = require('./cohorts/cohortsRoutes.js');

const server = express();

const port = 9000;

server.use(helmet());
server.use(express.json());

// sanity check
server.get('/', (req, res) => {
  res.send("Sanity is still debateable")
});

server.use('/api/cohorts', cohortsRoutes);

server.listen(port, () => console.log(`\n== API RUNNING ON ${port} ==\n`))