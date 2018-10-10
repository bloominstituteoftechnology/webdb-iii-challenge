const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(helmet());
server.use(express.json());

//sanity check endpoint
server.get('/', (req, res) => {
    res.send("It's allliiiiiiiiive!!!");
});

const port = 8888;
server.listen(port, () => console.log(`***API running on ${port}`));