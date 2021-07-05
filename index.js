const express = require('express');
const cohortRoute = require('./Routes/Cohort_Route');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
const PORT = 4000;
server.use(express.json());
server.use(helmet());
server.use(logger('dev'))
server.disable("etag");

server.use('/api/cohorts', cohortRoute);

server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${PORT}`);
});