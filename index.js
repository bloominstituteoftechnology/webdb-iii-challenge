const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// ENDPOINTS HERE

server.get('/', (req, res) => {
  res.json('Server is up and running!');
});

// SERVER PORT

const port = 6000;
server.listen(port, () => {
  console.log(`API is listening on port ${port}.`);
});
