const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const apiRoutes = require('./data/routers/apiRoutes');

const server = express();

server.use(express.json());
server.use(morgan('combined'));
server.use(helmet());

server.use('/api', apiRoutes)

const port = 3300;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port}... *.* ===\n`);
});
