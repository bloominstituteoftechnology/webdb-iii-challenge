const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(helmet(), express.json());

const port = 9999;
server.listen(port, () => {console.log(`#### Server active on port ${port} ####\n`)})