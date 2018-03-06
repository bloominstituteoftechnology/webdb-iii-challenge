const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;

const userRouter = require('./routers/userRouter');

const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
	res.status(200).json({ api: 'running...' });
});

server.use('/users', userRouter);

server.listen(port, function() {
	console.log(`Server running on port ${port}`);
});
