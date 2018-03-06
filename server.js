const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js');
const userRouter = require('./users/userRouter.js');
// const postRouter = require('./posts/postRouter.js');
// const tabRouter = require('./tabs/tabRouter.com');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'Server up and running.' });
});

// server.use('') // for later with specific routers

const port = 3000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});