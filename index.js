const express = require('express');

const cohortRouter = require('./routers/cohort_router.js');
// const studentRouter = require('./routers/students_router.js');


const server = express();
const PORT = 4567;

server.use(express.json());
server.use('/api/cohorts', cohortRouter);
// server.use('/api/students', studentRouter);


server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}!`)
})