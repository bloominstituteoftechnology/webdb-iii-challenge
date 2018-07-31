const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Welcome to my Lambda Forum')
})

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});