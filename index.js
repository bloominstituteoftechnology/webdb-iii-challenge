const express = require('express');
const cohortRouter = require('./routers/cohort_router')
const studentsRouter = require('./routers/students_router')

const server = express();

const PORT = 5002;

server.use(express.json());

server.use('/api/cohorts', cohortRouter)
server.use('/api/students', studentsRouter)


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
