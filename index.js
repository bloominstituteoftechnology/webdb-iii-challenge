
const express = require('express')
const cohortRoutes = require('./data/routes/cohortRoutes')
const studentRoutes = require('./data/routes/studentRoutes')
const mwConfig = require('./mwConfig')

const PORT = 5222
const server = express()
server.use(express.json())

mwConfig(server)

server.use('/api/students', studentRoutes)
server.use('/api/cohorts', cohortRoutes)





server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})