const express = require('express')
const server = require('./server.js')

const port = 9000

server.listen(port, () => console.log(`Port listening on ${port}`))