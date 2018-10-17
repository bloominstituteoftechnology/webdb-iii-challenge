const express = require('express');
const server = express();

server.use(helmet());
server.use(express.json());

const port = 4000;
server.listen(port, () => console.log(`\n ===== Listening at port ${port} ===== \n`));