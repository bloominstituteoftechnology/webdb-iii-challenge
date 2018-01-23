const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js');

const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/', function (req, res) {
    res.status(200).json({ success: true })
})

// create new user
server.post('/api/users', (req, res) => { // new route handler
    const user = req.body;
    knex
        .insert(user)
        .into('users')
        .then((ids) => {
            res.status(201).json({ ids })
        }).catch((error) => {
            console.log(error);
            res.status(500).json({ errorMessage: 'Could not insert the User' })
        })
})

// return array of users
server.get('/api/users', (req, res) => {
    const users = knex('users')
        .then((users) => {
            res.status(200).json(users);
        }).catch(() => {
            res.status(500).json({ errorMessage: 'Could not return users' });
        });
})

// return user with matching id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    knex('users')
        .where('id', id)
        .then((records) => {
            res.status(200).json(records);
        }).catch(() => {
            res.status(500).json({ errorMessage: 'Could not insert the User' });
        });
})

// return all posts for user with specified id
server.get('/api/users/:id/posts', (req, res) => {
    const { id } = req.params;
    knex('posts')
        .where('user-id', userid)
        .then((records) => {
            res.status(200).json(records);
        }).catch(() => {
            res.status(500).json({ errorMessage: 'Could not return posts' });
        });
})

// update user with matching id
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    knex('users')
        .where('id', id)
        .update((records) => {
            res.status(200).json(records);
        }).catch(() => {
            res.status(500).json({ errorMessage: 'Could not update User' });
        });
})

// delete user by id
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    knex('users')
        .where('id', id)
        .then((records) => {
            res.status(200).json(records);
        }).catch(function () {
            res.status(500).json({ errorMessage: 'Could not delete the User' });
        });
})

const port = 3000;
server.listen(port, function () {
    console.log(`Server Listening on ${port}`);
});
