const express = require('express');
const knex = require('knex');

const server = express();
const port = 9000



server.listen(port, () => console.log(`\n API is running on port ${port} \n`));

