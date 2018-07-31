const express = require('express');

const db = require('./data/db')

const server = express();
server.get('/', (req, res) => {
    res.send('up and running...')
    });

    const port = 3500;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});