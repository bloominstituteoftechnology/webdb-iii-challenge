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

server.post('/posts', (req, res) => {
	const { userId, text } = req.body;
	if (!userId || !text) {
		res.status(404).json({message: 'Provide both userId and text.'});
	} else {
		knex('posts').insert(req.body)
			.then(() => {
				res.status(201).json({message: 'Successfully added a new post.'})
			})
			.catch(error => {
				res.status(500).json(error);
			});
	}
});

server.get('/posts', (req, res) => {
	knex('posts')
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			res.status(500).json(error);
		})
});

server.get('/posts/:id', (req, res) => {
	const { id } = req.params;
	knex('posts').where({ id })
		.then(post => {
			if (post.length > 0) {
				res.status(200).json(post);	
			} else {
				res.status(404).json({message: 'Post not found.'});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		})
})

server.put('/posts/:id', (req, res) => {
	const { id } = req.params;
	const newPost = req.body;
	if (!id) {
		res.status(404).json({message: 'Please provide an id.'});
	} else if (!newPost) {
		res.status(404).json({message: 'Please provide updated information.'});
	} else {
		knex('posts').where({ id }).update(newPost)
			.then(() => {
				res.status(201).json({message: 'Successfully updated post.'})
			})
			.catch(error => {
				res.status(500).json(error);
			})
	}
});

server.delete('/posts/:id', (req, res) => {
	const { id } = req.params;
	knex('posts').where({ id }).del()
		.then(() => {
			res.status(201).json({message: 'Successfully deleted post.'});
		})
		.catch(error => {
			res.status(500).json(error);
		})
})























const port = 5000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
})