console.log("Howdy from index.js!");
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
// const knex = require('knex');

const server = express();

server.use(express.json());
server.use(logger('combined'));
server.use(cors());
server.use(helmet());

//middlewear

//routes

//server testing message
server.get('/', (req, res) => {
    res.send('Server Is Up and Running!...Why are you just standing there! Go catch it!!!');
  });
  
  const port = 9000;
  server.listen(port, () => console.log(`API running away fast on port ${port}`));
  