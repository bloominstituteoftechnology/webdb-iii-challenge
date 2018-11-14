const express = require('express');
const helmet = require('helmet');
const cohortsRoute = require('./api/cohortsRoute.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/cohorts', cohortsRoute);

const port = 3300;
server.listen(port, function() {
    console.log(`\n---- Lambda API Listening on http://localhost:${port} ----\n`);
});