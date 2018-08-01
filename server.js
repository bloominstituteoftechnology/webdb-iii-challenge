const express = require('express')
const morgan = require('morgan')
const users = require('./routers/users.js')
const posts = require('./routers/posts.js')
const server = express()

server.use(morgan('tiny'))
server.use(express.json())

server.use('/users', users)
server.use('/posts', posts)

server.listen(3333, () => console.log('3333'))
