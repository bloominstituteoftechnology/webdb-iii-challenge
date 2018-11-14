const express = require('express')
const cohortsRoute = require('./api/cohortsRoute')

const server = express()

server.use(express.json())

server.use('/api/cohorts', cohortsRoute)

server.listen(8000, () => console.log('active on port 8000'))
