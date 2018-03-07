const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./database/db');

const server = express();
server.use(bodyParser.json());

server.post('/users', (req, res) => {
	const { name } = req.body;
	if (!name) {
		res.status(404).json({ message: 'Must provide user\'s name.'});
	} else {
		knex('users')
			.insert({ name })
			.then(data => {
				res.status(200).json(data);
			})
			.catch(err => {
				res.status(500).json(err);
			});
	}
})

const port = 5000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})