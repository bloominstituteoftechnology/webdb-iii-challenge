const express = require('express')
const helmet = require('helmet')

const server = express()

server.use(helmet())
server.use(express.json())

server.get('/', (req, res) => {
  res.send("It's Alive")
})

server.listen(9000, () => console.log('\nAPI running on 9k\n'))