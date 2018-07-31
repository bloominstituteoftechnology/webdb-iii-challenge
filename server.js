const express = require('express');
//const helmet = require('helmet');
const db = require('./data/db');


const server = express();

server.use(express.json());

server.get('/', (req, res) => {
        res.send('Testing');
});



server.listen(5000, () => console.log('API running on port 5000'));
