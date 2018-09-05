const express = require('express');
const helmet = require('helmet');

const apiRoute = require('./api');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api', apiRoute);

server.listen(8000, () => console.log('<= API RUNNING = PORT: 8000 =>'));
