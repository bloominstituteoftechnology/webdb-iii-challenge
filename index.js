//create server
const express = require('express');
const server = express();

//built in middleware
server.use(express.json());
const helmet = require('helmet');
server.use(helmet());


//Listener
const PORT = 4000;
server.listen(PORT, function(){
    console.log(`Server is up and running on port ${PORT}`);
});