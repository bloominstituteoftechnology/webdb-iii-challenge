//create server
const express = require('express');
const server = express();

//built in  and 3rd party middleware
server.use(express.json());
const helmet = require('helmet');
server.use(helmet());

//Grab route handlers/endpoints
const cohortsRoutes = require('./routers/cohortsRouter');
server.use('/api/cohorts', cohortsRoutes);
const studentsRoutes = require('./routers/studentsRouter');
server.use('/api/students', studentsRoutes);


//Listener
const PORT = 4000;
server.listen(PORT, function(){
    console.log(`Server is up and running on port ${PORT}`);
});