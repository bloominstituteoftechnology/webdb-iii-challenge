const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const db = require('./data/db');

const server = express();
const port = 8000;

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.send('The blog server is running...')
});

server.listen(port, () => console.log(`\n==== API running on port ${port} ====\n`));