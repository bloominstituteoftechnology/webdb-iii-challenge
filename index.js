const express = require('express');

const server = express();

const userRoutes =  require('./router/userRouter');

server.use(express.json());
server.use('/users', userRoutes);





server.listen(8000, () => {
    console.log('=====API=========')
})