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
});

server.get('/users', (req, res) => {
	knex('users')
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(500).json(error);
		})
});


server.get('/users/:id', (req, res) => {
	const { id } = req.params;

	knex('users').where({ id })
		.then(user => {
			if (user.length > 0) {
				res.status(200).json(user);
			} else {
				res.status(404).json({message: 'User does not exist'});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

server.get('/users/:id/posts', (req, res) => {
	const { id } = req.params;

	knex('posts').where('userId', id)
		.then(posts => {
			if (posts.length > 0) {
				res.status(200).json(posts);
			} else {
				res.status(404).json({message: 'User does not exist'});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		})
});


server.put('/users/:id', (req, res) => {
	const { id } = req.params;
	const user = req.body;

	knex('users').where({ id }).update(user)
		.then(user => {
			if (!user) {
				res.status(404).json({message: 'User does not exist'});
			} else {
				res.status(200).json({message: 'User updated successfully'});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		})
});


server.delete('/users/:id', (req, res) => {
	const { id } = req.params;

	knex('users').where({ id }).del()
		.then(() => {
			res.status(200).json({message: 'User deleted successfully'});
		})
		.catch(error => {
			res.status(500).json(error);
		})
});



const port = 5000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})