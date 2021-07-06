const express = require('express')
const api = require('./Routers/apiRouter');

const server = express()

server.use(express.json())

//Basic Test
server.get('/', (req, res) => {
  res.send('Success!')
})

server.use('/api', api)


server.listen(3000, () => {
  console.log('\n ==== API is running ==== \n')
})