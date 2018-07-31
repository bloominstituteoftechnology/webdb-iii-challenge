const express = require('express');

const server = express();

server.use(express());

server.get('/', (req, res) => {
    res.send('up and running...');
});

const port = 8000;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on htttp://localhost:${port} ===\n`);
});