const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet);

// End points
server.get('/', (req, res) => {
    res.send('Server is working!')
})


// Port
server.listen(9000, () => {
    console.log("App listening on port 9000")
})