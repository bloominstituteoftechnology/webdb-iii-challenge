const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const PORT = 9000
const server = express()

server.use(helmet())
server.use(express.json())
server.use(morgan('dev'))

server.use('/api/cohorts/', require('./routes/cohortRoute'))

server.get('/', (req, res) => res.send('Running'))

server.listen(PORT, () => console.log(`SERVER is running on PORT ${PORT}`))