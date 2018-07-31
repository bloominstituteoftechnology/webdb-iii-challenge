const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req, res) => {
  res.send('Success!')
})

server.listen(3000, () => {
  console.log('\n ==== API is running ==== \n')
})