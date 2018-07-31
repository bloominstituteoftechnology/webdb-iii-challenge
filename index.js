const express = require('express')
const morgan = require('morgan')
const users = require('./routers/users.js')
const server = express()

server.use(morgan('tiny'))
server.use(express.json())

server.use('/users/', users)

server.listen(3333, () => console.log('3333'))
