const express = require('express')
const cohortRoutes = require('./routes/cohortRoutes.js')
const studentRoutes = require('./routes/studentRoutes.js')


//Initialize Server
const server = express();

//Middleware
server.use(express.json())

//Cohort End Points
server.use('/api/cohorts', cohortRoutes)
//Student End Points
server.use('/api/students', studentRoutes)

//Sanity Check
server.get('/', (req, res) => {
    res.json({api: 'up'})
})


module.exports = server