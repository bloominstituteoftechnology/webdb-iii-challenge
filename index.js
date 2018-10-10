const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());


server.get('/', (req, res) => {
  res.send('<h1>Server is running!</h1>');
});


const port = 9000;
server.listen(port, () => {
  console.log(`API is listening on port ${port}.`);
});