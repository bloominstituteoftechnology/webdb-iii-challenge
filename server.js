const express = require('express');
const bodyParser = require('body-parser');
const { port } = require('./config');

const usersRouter = require('./users/usersRouter');

const server = express();

server.use(bodyParser.json());
server.use('/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'running...' });
});

server.listen(process.env.PORT || port, _ => {
  console.log(`API running on ${port}`);
});
