const express = require('express');
const helmet = require('helmet');
const logger = require('morgan')


const PORT = 5000;
const server = express();
const cohorts = require('./routes/cohorts.js');
const students = require('./routes/students');



server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
server.use('/', cohorts);
server.use('/', students);




server.listen(PORT, ()=> {
    console.log(`Listening at localhost ${PORT}`);
});