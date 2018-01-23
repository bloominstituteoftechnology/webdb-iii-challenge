const PORT = 3000;

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/routes.js');



const server = express();

/* Middlewares */
server.use(bodyParser.json());

/* Routes */
routes(server);



server.listen(PORT, () => {
  console.log('Express server is running on http://localhost:' + PORT);
});