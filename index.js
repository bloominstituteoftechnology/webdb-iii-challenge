const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const PORT = 5050;

// endpoints
server.get('/', (req, res) => {
  res.json('It is working!');
});

server.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
