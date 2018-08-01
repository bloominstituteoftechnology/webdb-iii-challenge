const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

//***********USERS ENDPOINTS**********************
server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/users', (req, res) => {
	db('Users').then(users=> {
		res.status(200).json(users);
	}).catch(err => res.status(500).json(err));
});

server.post('/users', (req, res) => {
	const user = req.body;
	db.insert(user).into('users')
	.then(ids => {
		const id = ids[0];
		res.status(201).json({ id, ...user })
	}).catch(err => res.status(500).json(err));
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db('Users').where({id: Number(id)})
    .then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({error: 'Unable to retrieve user information.'})
    })
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    db('Users').where({id: Number(id)})
    .update(user)
    .then(response => {
        res.status(201).json({response})
    }).catch(err => {res.status(500).json(err)
    })
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    db('Users').where({id: Number(id)})
    .delete(user)
    .then(response => {
        res.status(201).json({response})
    }).catch(err => {res.status(500).json(err)
    })
});


//***********POST ENDPOINTS**********************

server.get('/posts', (req, res) => {
	db('Posts').then(users=> {
		res.status(200).json(users);
	}).catch(err => res.status(500).json(err));
});

server.post('/posts', (req, res) => {
	const post = req.body;
	db.insert(post).into('Posts')
	.then(ids => {
		const id = ids[0];
		res.status(201).json({ id, ...post })
	}).catch(err => res.status(500).json(err));
});

server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;
    db('Posts').where({id: Number(id)})
    .update(post)
    .then(response => {
        res.status(201).json({response})
    }).catch(err => {res.status(500).json(err)
    })
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = req.body;
    db('Posts').where({id: Number(id)})
    .delete(post)
    .then(response => {
        res.status(201).json({response})
    }).catch(err => {res.status(500).json(err)
    })
});




const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
