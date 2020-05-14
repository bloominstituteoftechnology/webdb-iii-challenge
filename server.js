const express = require('express');
const bodyParser = require('body-parser');

const postsEndpoints = require('./posts/postsEndpoints.js');
const tagsEndpoints = require('./tags/tagsEndpoints.js');
const usersEndpoints = require('./users/usersEndpoints.js');

const server = express();

server.use(bodyParser.json());

server.use('/api/posts', postsEndpoints);
server.use('/api/tags', tagsEndpoints);
server.use('/api/users', usersEndpoints);

server.listen(3000, () => console.log('running on port 3000'));
