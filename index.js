const express = require('express');
const server = express();

const knex = require('knex');
const dbConfig = require('./knexfile');

const cohortRouter = require('./routes/cohortRoutes');
const studentRouter = require('./routes/studentRoutes');

const db = knex(dbConfig.development);
const PORT = process.env.PORT || 3400;

server.use(express.json());

//GET

server.use('/cohorts', cohortRouter);

server.use('/students', studentRouter);


//SERVER

server.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});