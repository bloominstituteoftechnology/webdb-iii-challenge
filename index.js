const express = require('express');
const helmet = require('helmet');

const cohortsRoutes = require('./routes/cohorts/cohortsRoutes.js');

const server = express();
const port = 8000;

server.use(helmet(), express.json());

// Sanity Check
server.get('/', (req, res) => {
    res.send('<h1>Live Server<h1>')
});

server.use('/api/cohorts', cohortsRoutes);

function runServer() {
    console.log('\x1b[34m', `\n[server] started server`);
    console.log(`[server] running on port: ${port}\n`)
    console.log('\x1b[0m', '');
}

server.listen(port, runServer());