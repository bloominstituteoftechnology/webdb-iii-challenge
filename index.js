const express = require('express');

const server = express();

const userRoutes =  require('./router/userRouter');
const postRoutes = require('./router/postRouter');

server.use(express.json());

server.use('/users', userRoutes);
server.use('/posts', postRoutes);





server.listen(8000, () => {
    console.log('=====API=========')
})