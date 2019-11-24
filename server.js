const express = require('express');
const bodyParser = require('body-parser');

const PostsEndpoints = require('./Posts/PostsEndpoints.js');
const TagsEndpoints = require('./Tags/TagsEndpoints.js');
const UsersEndpoints = require('./Users/UsersEndpoints.js');

const server = express();

server.use(bodyParser.json());

server.use('/api/posts', PostsEndpoints);
server.use('/api/tags', TagsEndpoints);
server.use('/api/users', UsersEndpoints);

//end points here

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
})