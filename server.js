const express = require('express');
const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

const server = express();

server.use(bodyParser.json());

//USER CREATE
server.post('/users', (req, res) => {
    const name = req.body;
    knex
        .insert(name)
        .into('users')
        .then ((ids) => {
            res.status(201).json({ id: ids });
        })
        .catch((err) => {
            if(err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'input incorrect'})
            } else {
                res.status(500).json(err)
            }
        });
});

//USER UPDATE
server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body
    const users = knex('users')
    .where('id', id)
    .update(update)
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})

//USER DELETE
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const users = knex('users')
    .where('id', id)
    .del()
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})

//USER GET ALL
server.get('/users', (req, res) => {
    const users = knex('users')
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        res.status(500).json({ err })
    });
});

//USER GET ID
server.get('/users/:id', (req,res) => {
    const { id } = req.params;
    const users = knex('users')
    .where('id', id )
    .then((users) => {
        res.status(200).json(users)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})
//USER GET ID POSTS
server.get('/users/:id/posts', (req,res) => {
    const { id } = req.params;
    const users = knex('users')
    // .join('users', 'users.id', 'posts.userID')
    // .select('users.id', 'posts.text')
    .where('id', id)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})

//POST CREATE
server.post('/posts', (req, res) => {
    const { userID, text } = req.body;
    knex
        .insert({ userID,text })
        .into('posts')
        .then ((ids) => {
            res.status(201).json({ id: ids });
        })
        .catch((err) => {
            if(err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'input incorrect'})
            } else {
                res.status(500).json(err)
            }
        });
});

//POST UPDATE
server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body
    const posts = knex('posts')
    .where('id', id)
    .update(update)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})

//POST DELETE
server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const posts = knex('posts')
    .where('id', id)
    .del()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})

//POST GET ALL
server.get('/posts', (req, res) => {
    const posts = knex('posts')
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(500).json({ err })
    });
});

//POST GET ID
server.get('/posts/:id', (req,res) => {
    const { id } = req.params;
    const posts = knex('posts')
    .where('id', id)
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})
//TAG CREATE
server.post('/tags', (req, res) => {
    const { tag } = req.body;
    knex
        .insert({ tag })
        .into('tags')
        .then ((ids) => {
            res.status(201).json({ id: ids });
        })
        .catch((err) => {
            if(err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'input incorrect'})
            } else {
                res.status(500).json(err)
            }
        });
});

//TAG UPDATE
server.put('/tags/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body
    const tags = knex('tags')
    .where('id', id)
    .update(update)
    .then((tags) => {
        res.status(200).json(tags)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})

//TAG DELETE
server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    const tags = knex('tags')
    .where('id', id)
    .del()
    .then((tags) => {
        res.status(200).json(tags)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})

//TAG GET ALL
server.get('/tags', (req, res) => {
    const tags = knex('tags')
    .then((tags) => {
        res.status(200).json(tags)
    })
    .catch((err) => {
        res.status(500).json({ err })
    });
});

//TAG GET ID
server.get('/tags/:id', (req,res) => {
    const { id } = req.params;
    const tags = knex('tags')
    .where('id', id)
    .then((tags) => {
        res.status(200).json(tags)
    })
    .catch((err) => {
        res.status(500).json({ err })
    })
})

server.get('/', (req, res) => {
    knex('posts')
        .toSQL()
        .then(() => {
            res.json()
        })
})

const port = 3100;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});