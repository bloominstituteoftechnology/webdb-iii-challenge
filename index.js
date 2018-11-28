const express = require('express');
const helmet = require('helmet');

const server = express();

// server.use(express.json());
// server.use(helmet());

server.use(helmet(), express.json());

const port = 8888;
server.listen(port, () => {console.log(`\n#### Server running on port ${port} ####\n`)})