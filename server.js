const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');

const server = express();
server.use(bodyParser.json());

const port = 5000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})