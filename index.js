//Dependencies
const express = require('express');
const helmet = require('helmet');

//Imports
const cohortRoutes = require('./routes/cohortRoutes.js');

//Initiating Server
const server = express();
const port = 7000;

server.use(express.json());
server.use(helmet());

//Testing 
server.get('/', (req, res) => {
    res.send('Are you working?'); //Yes it is!
})

//Routes
server.use('/api/cohorts', cohortRoutes);

//Listening
server.listen(port, () => {
    console.log(`\n === API RUNNING ON PORT ${port} === \n`);
})
