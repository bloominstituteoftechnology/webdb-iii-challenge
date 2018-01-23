const express = require('express');
const bodyParser = require('body-parser');
const knex = require('./database/db.js');

const server = express();

server.use(bodyParser.json());

// ###### USERS ENDPOINTS ##### --> completely done
server.get('/', function(req, res) {
    res.status(200).json({ success: true });
});

server.post('/users', function(req, res) {
    const user = req.body;
    knex.insert(user).into('users')
        .then((addedUser) => {
            res.status(201).json(addedUser);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});

server.get('/users', function(req, res) {
    knex('users')
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});

server.get('/users/:id', function(req, res) {
    const { id } = req.params;
    knex('users').where('id', id)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});
// cannot do until we make posts db
// [GET] /users/:id/posts returns all posts for the user with the specified id.
// finished, access data through the post db
server.get('/users/:id/posts', function(req, res) {
    const { id } = req.params;
    knex('posts').where('userId', id)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});

server.put('/users/:id', function(req, res) {
    const { name } = req.body;
    const { id } = req.params;
    knex('users')
        .where('id', id)
        .update({
            'name': name
        })
        .then(() => {
            res.status(200).json({ message: 'User has been updated'});
        })
        .catch(() => {
            res.status(422).json({message: 'User was not updated'});
        });
});

server.delete('/users/:id', function(req, res) {
    const { id } = req.params;
    knex('users')
        .where('id', id)
        .del()
        .then((isUserDeleted) => {
            res.status(200).json(isUserDeleted);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});

// ###### POSTS ENDPOINTS ####### ---> Completely done
server.get('/api/posts', function(req, res) {
    res.status(200).json({ success: true });
});

server.post('/posts', function(req, res) {
    const user = req.body;
    knex.insert(user).into('posts')
        .then((addedPost) => {
            res.status(201).json(addedPost);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});

server.get('/posts', function(req, res) {
    knex('posts')
        .then((post) => {
            res.status(200).json(post);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});

server.get('/posts/:id', function(req, res) {
    const { id } = req.params;
    knex('posts').where('userId', id)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});
server.put('/posts/:id', function(req, res) {
    const { text } = req.body;
    const { id } = req.params;
    knex('posts')
        .where('id', id)
        .update({
            'text': text
        })
        .then(() => {
            res.status(200).json({ message: 'Post has been updated'});
        })
        .catch(() => {
            res.status(422).json({message: 'Post was not updated'});
        });
});
server.delete('/posts/:id', function(req, res) {
    const { id } = req.params;
    knex('posts')
        .where('id', id)
        .del()
        .then((isPostDeleted) => {
            res.status(200).json(isPostDeleted);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});

// ###### TAGS ENDPOINTS #####
server.post('/tags', function(req, res) {
    const tag = req.body;
    knex.insert(tag).into('tags')
        .then((idOfAddedTag) => {
            res.status(200).json(idOfAddedTag);
        })
        .catch((error) => {
            res.status(200).json(error);
        });
});

server.get('/tags', function(req, res) {
    knex('tags')
        .then((allTags) => {
            res.status(200).json(allTags);
        })
        .catch((error) => {
            res.status(200).json(error);
        })
});

server.get('/tags/:id', function(req, res) {
    const { id } = req.params;
    knex('tags')
        .where('id', id)
        .then((tags) => {
            res.status(200).json(tags);
        })
        .catch((error) => {
            res.status(422).json(error);
        })
});

server.put('/tags/:id', function(req, res) {
    const { id } = req.params;
    const { tag } = req.body;
    knex('tags').where('id', id)
        .update({
            'tag': tag
        })
        .then((wasTagUpdated) => {
            res.status(200).json(wasTagUpdated);
        })
        .catch((error) => {
            res.status(422).json(error);
        });
});

server.delete('/tags/:id', function(req, res) {
    const { id } = req.params;
    knex('tags').where('id', id)
        .del()
        .then(() => {
            res.status(200).json('Tag was deleted');
        })
        .catch(() => {
            res.status(422).json('Tag was not deleted');
        });
});


const port = 3001;
server.listen(port, function() {
    console.log(`Server listening on port ${port}`);
});