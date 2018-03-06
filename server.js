const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const userRouter = require('./routers/userRouter');
const postRouter = require('./routers/postRouter');
const tagRouter = require('./routers/tagRouter');

const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
	res.status(200).json({ api: 'running...' });
});

server.use('/users', userRouter);
server.use('/posts', postRouter);
server.use('/tags', tagRouter);

server.listen(port, function() {
	console.log(`Server running on port ${port}`);
});
