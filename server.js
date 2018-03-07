const express = require('express');
const bodyparser = require('body-parser');

const knex = require('./database/dbConfig');

const server = express();

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');
// const tagRouter = require('./tags/tagRouter.js');

server.get('./', (req, res) => {
    res.status(200).json({ message: 'Everything is working!'});
});


server.use(bodyparser.json());

server.use('/users', userRouter);
server.use('/posts', postRouter);
// server.use('/tags', tagRouter);

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})