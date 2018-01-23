const express = require('express');

const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

const server = express();

server.use(bodyParser.json());

// User routes

server.get('/', (req, res) => {
    res.status(200).json({ success: true });
});

server.post('/users', (req, res) => {
    const user = req.body;
    
    knex.insert(user)
        .into('users')
        .then(function(ids) {
            res.status(201).json({ ids });
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'could not insert into table' });
        });
});

server.get('/users', (req, res) => {
   const users = knex('users')
        .then(function(users) {
            res.status(200).json(users);
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'could not find user' });
        })
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const users = knex('users')
        .where('id', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'could not find that id' });
        });
});

server.get('/users/:id/posts', async (req, res) => {
    // easier instead of chaining queries
    try {
        const user = await knex('users')
            .where('id', req.params.id)
            .limit(1);
        
        const posts = await knex('posts')
            .where('userId', user[0].id)
            res.status(200).json(posts)
    }
    catch(error) {
        res.status(500).json(error);
    }
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    const user = knex('users')
        .where('id', id)
        .update(updatedUser)
        .then(function(successFindUser) {
            if (successFindUser === 0) throw new Error();
            res.status(200).json(successFindUser);
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'could not update user' });
        });
});

server.delete('/users/:id', function(req, res) {
    const { id } = req.params.id;

    const user = knex('users')
        .where('id', id)
        .delete()
        .then(function(user) {
            if (!user) throw new Error();
            res.status(200).json(user);
        })
        .catch(function() {
            res.status(500).json( {errorMessage: 'You did not delete user' });
        })
});

// Posts Routes

server.post('/posts', (req, res) => {
    const posts = req.body;

    knex.insert(posts)
        .into('posts')
        .then(function(ids) {
            res.status(201).json({ ids });
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'Cannot add posts '});
        });
});

server.get('/posts', (req, res) => {
    const posts = knex('posts')
        .then(function(posts) {
            res.status(200).json(posts);
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'could not find post' });
        });
});

server.get('/posts/:id', async (req, res) => {
    const name = req.params.name;
    const tag = req.params.tag;

    try {
        const posts = await knex('posts')
            .where('id', req.params.id)
        
        const user = await knex('users')
            .where('name', name)
        
        const tags = await knex('tags')
            .where('tag', tag)
        }
    catch(error) {
        res.status(500).json(error);
    }
});

server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const updatedPost = req.body;

    const post = knex('posts')
        .where('id', id)
        .update(updatedPost)
        .then(function(successFindPost) {
            if (!successFindPost) throw new Error();
            res.status(200).json(successFindPost);
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'could not update post' });
        });
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params.id;

    const post = knex('posts')
        .where('id', id)
        .delete()
        .then(function(post) {
            if (!post) throw new Error();
            res.status(200).json(post)
        })
        .catch(function() {
            res.status(500).json( {errorMessage: 'You did not delete the post' });
        });
});

// Tags Routes

server.post('/tags', (req, res) => {
    const tags = req.body;

    knex.insert(tags)
        .into('tags')
        .then(function(ids) {
            res.status(201).json({ ids: ids });
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'can not create tag' });
        });
});

server.get('/tags', (req, res) => {
    const tags = knex('tags')
        .then(function(tags) {
            res.status(200).json(tags);
        })
        .catch(function() {
            res.status.json({ errorMessage: 'cannot find tags' });
        });
});

server.get('/tags/:id', (req, res) => {
    const { id } = req.params;

    const tag = knex('tags')
        .where('id', id)
        .then(function(records) {
            res.status(200).json(records);
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'cannot find that tag id' });
        });
});

server.delete('/tags/:id', (req, res) => {
    const { id } = req.params.id;

    const tag = knex('tags')
        .where('id', id)
        .delete()
        .then(function(tag) {
            if (!tag) throw new Error();
            res.status(200).json(tag)
        })
        .catch(function() {
            res.status(500).json( {errorMessage: 'You did not delete the tag' });
        });
});

server.post('/posts/:postId/addtag/:tagId', (req, res) => {
    const postId = req.params.postId;
    const tagId = req.params.tagId;

    knex('tagspost')
        .insert({ postId, tagId })
        .then(function(postId) {
            if (!postId) throw new Error();
            res.status(200).json(postId);
        })
        .catch(function() {
            res.status(500).json({ errorMessage: 'could not post' });
        });
});

// extra credit route

server.get('/posts/:id/tags', (req, res) => {
    const id = req.params.id;
    knex.raw(`
  SELECT * 
  FROM tags 
  WHERE tags.id
  IN (
	  SELECT tagspost.tagId
	  FROM tagspost 
	  WHERE tagspost.postId = ${id}
  )
  `)
  .then(results => {
    if (!results.length) throw new Error();
    res.status(200).json(results);
  })
  .catch(err => {
    res.status(500).json({err: 'Could not find tags'});
  });
});

const port = 3000;
server.listen(port, () => {
    console.log(`server running at ${port}`);
})
