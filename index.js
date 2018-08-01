const express = require('express');
const api = require('./routes/apiRouter');

const server = express();


server.use(express.json());


server.get('/', (req, res) => {
    res.send('up and running...');
});

server.use('/api', api)

const port = 8000;
server.listen(port, function() {
    console.log(`\n=== Web API Listening on htttp://localhost:${port} ===\n`);
});