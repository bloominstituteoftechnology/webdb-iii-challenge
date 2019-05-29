const express = require('express');

const cohortsRouter = require('./api/cohorts/cohorts-router')

const server = express();

server.use(express.json());

server.use('/api/cohorts', cohortsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

module.exports = server;