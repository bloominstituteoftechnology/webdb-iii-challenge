const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cohortsRoute = require('./api/cohortsRoute')

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
    res.send('API Running...');
});
server.use('/api/cohorts', cohortsRoute);


server.listen(9000, () => console.log('Server running on port 9000'));
