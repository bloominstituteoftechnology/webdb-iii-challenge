const express = require('express');
const helmet = require('helmet');
const server = express();

server.use(helmet());
server.use(express.json())

















server.listen(9000, () => {
    console.log('Server started on port 9000')
})