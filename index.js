const express = require('express');
const helmet = require('helmet');
const server = express();
server.use(helmet(), express.json());

const port = 800;
server.listen(port, () => {console.log(`=*= Server rolling on port ${port} =*=\n`)})
