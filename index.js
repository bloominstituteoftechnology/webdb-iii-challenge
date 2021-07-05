const express = require('express');
const configureMiddleware = require('./config/middleware.js');

const server = express();

configureMiddleware(server);

server.get('/', (req, res)=>{
    res.send("It's working!");
});

server.listen(8000, () => console.log('Running on Port 8000'));