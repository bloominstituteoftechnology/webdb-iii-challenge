const express = require('express');
const server = express();
const requireAll = require('require-all');
var _ = require('lodash');
server.use(express.json());

const helmet = require('helmet');
server.use(helmet());

/*
// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
*/

// add your server code starting here
server.listen(3300, () => console.log('server running'));

process.setMaxListeners(0);

const controllers = requireAll(__dirname + '/src/endpoints');
_.each(controllers, (endpoints, controller) => {
  _.each(endpoints, (definition, endpoint) => {
  	console.log(`${endpoint}: /api/${controller}${definition.url}`);
    server[definition.type.toLowerCase()](`/api/${controller}${definition.url}`, definition.handler);
  });
});