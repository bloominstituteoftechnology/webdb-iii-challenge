const express = require('express');
const helmet = require('helmet');
const cohortsRoutes = require('./routes/cohortsRoutes.js')
const studentsRoutes = require('./routes/studentsRoute.js');


const server = express();

server.use(helmet());
server.use(express.json());

server.get('/', (req,res) => {
    res.send("It is working");
});

server.use('/api/cohorts', cohortsRoutes);
server.use('/api/students', studentsRoutes);

server.listen(9000, () => console.log('\n Api is running \n'));