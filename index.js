const express = require('express');
const server = express();
const fauxServer = require('./routes/server')
const knex = require('knex');
const knexConfig = require('./knexfile'); 
const db = knex(knexConfig.development);

server.use(express.json());


server.use('/cohorts', fauxServer());
server.use('/students', fauxServer());

server.listen(8888, () => console.log(`Server listening on Port 8888`))