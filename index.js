const express = require('express')

const server = express()
server.use(express.json())

server.get('/', (req, res) => {
  res.send('up & running...')
})

server.listen(8000, () => console.log('API RUNNING'))
