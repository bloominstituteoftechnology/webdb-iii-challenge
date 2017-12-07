const express = require('express');
const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

const server = express();

server.use(bodyParser.json());

//endpoints!
//=========================================================
//users
server.post('/users', (req, res) => {
	const user = req.body;
	knex
		.insert(user)
		.into('users')
		.then(ids => {
			res.status(201).json({ ids: ids });
		})
		.catch(err => {
			if (err.code === 'SQLITE_CONSTRAINT') {
				res.status(422).json({ error: 'This user already exist' });
			} else {
				res.status(500).json(err);
			}
		});
});

server.get('/users', (req, res) => {
	const users = knex('users')
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(500).json({ error });
		});
});

server.get('/users/:id', (req, res) => {
	const { id } = req.params;

	const users = knex('users')
		.where('id', id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(error => {
			res.status(500).json({ error: 'There is an issue finding this user' });
		});
});

server.get('/users/:id/posts', (req, res) => {

  console.log(knex('users').toString());

	const { id } = req.params;
	const posts = knex('posts')
    .where('userId', id)
    .select('userId', 'posts.text')
		.then((post) => {
			res.status(200).json(post);
		})
		.catch(error => {
			res.status(500).json({ error: 'There is an issue finding this users post' });
		});
});

server.delete('/users/:id', (req, res) => {
  knex('users')
    .where('id', req.params.id)
    .delete()
    .then((user) => {
      res.status(200).json({ deleted: user });
    })
    .catch((err) => {
      if(err.code === 'SQLITE_CONSTRAINT') {
        res.status(422).json({ error: 'This user does not exist' });
      } else {
        res.status(500).json(err);
      }
    });
});

//=========================================================
//posts
server.post('/posts', (req, res) => {
	const post = req.body;
	knex
		.insert(post)
		.into('posts')
		.then(ids => {
			res.status(201).json({ ids: ids });
		})
		.catch(err => {
			if (err.code === 'SQLITE_CONSTRAINT') {
				res.status(422).json({ error: 'This post already exist' });
			} else {
				res.status(500).json(err);
			}
		});
});

server.get('/posts', (req, res) => {
	const posts = knex('posts')
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(error => {
			res.status(500).json({ error });
		});
});

server.get('/posts/:id', (req, res) => {
	const { id } = req.params;

	const posts = knex('posts')
		.where('id', id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(error => {
			res.status(500).json({ error: 'There is an issue finding this post' });
		});
});


server.delete('/posts/:id', (req, res) => {
  knex('posts')
    .where('id', req.params.id)
    .delete()
    .then((post) => {
      res.status(200).json({ deleted: post });
    })
    .catch((err) => {
      if(err.code === 'SQLITE_CONSTRAINT') {
        res.status(422).json({ error: 'This post does not exist' });
      } else {
        res.status(500).json(err);
      }
    });
});

//=========================================================
//tags
server.post('/tags', (req, res) => {
	const tag = req.body;
	knex
		.insert(tag)
		.into('tags')
		.then(ids => {
			res.status(201).json({ ids: ids });
		})
		.catch(err => {
			if (err.code === 'SQLITE_CONSTRAINT') {
				res.status(422).json({ error: 'This tag already exist' });
			} else {
				res.status(500).json(err);
			}
		});
});

server.get('/tags', (req, res) => {
	const tags = knex('tags')
		.then(tags => {
			res.status(200).json(tags);
		})
		.catch(error => {
			res.status(500).json({ error });
		});
});

server.get('/tags/:id', (req, res) => {
	const { id } = req.params;

	const tags = knex('tags')
		.where('id', id)
		.then(tag => {
			res.status(200).json(tag);
		})
		.catch(error => {
			res.status(500).json({ error: 'There is an issue finding this tag' });
		});
});


server.delete('/tags/:id', (req, res) => {
  knex('tags')
    .where('id', req.params.id)
    .delete()
    .then((tag) => {
      res.status(200).json({ deleted: tag });
    })
    .catch((err) => {
      if(err.code === 'SQLITE_CONSTRAINT') {
        res.status(422).json({ error: 'This post does not exist' });
      } else {
        res.status(500).json(err);
      }
    });
});


const port = 3000;
server.listen(port, function() {
	console.log(`Server Listening on ${port}`);
});
