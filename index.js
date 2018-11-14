const express = require('express')
const server = express()
express.use(express.json())

server.get('/' (req, res) => {
  res.status(200).json({ api: 'ok' })
})

const port = 7000
server.listen(port, () => console.log(`\n--Server Running on port ${port}`))