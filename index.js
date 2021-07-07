const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

// routers
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const tagRouter = require('./tags/tagRouter');

const server = express();
server.use(cors());
server.use(express.json());
server.use(helmet());

server.use('/users', userRouter);
server.use('/posts', postRouter);
server.use('/tags', tagRouter);

server.get('/', (req, res) => {
    res.status(200).send(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.use(function (req, res) {
    res.status(404).json({ error: "Ain't nobody got time for that!" });
});

const port = 8000;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
