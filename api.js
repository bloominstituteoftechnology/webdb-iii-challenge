const express = require("express")
const helmet = require("helmet")
const logger = require("morgan")
const server = express()
const port = process.env.port || 5335

server.listen(port => {
 console.log(`Server is running live on ${port}`)
})

server.use('/api/cohorts', cohortRouter)
server.use('/api/students', studentRouter)