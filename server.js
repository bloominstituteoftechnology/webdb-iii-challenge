const express = require('express');
const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

const server = express();

server.use(bodyParser.json());

// endpoints here
// [POST] /users This route should save a new user to the server.
server.post('/users', function(req, res) {
    const { user } = req.body;
    knex
        .insert(user)
        .into('users')
        .then(function(ids) {
            res.status(201).json({ ids: ids });
        })
        .catch(function(err) {
            if (err.code === 'SQLITE_CONSTRAINT') {
                res.status(422).json({ error: 'The user already exists.'});
            } else {
                res.status(500).json(err);
            }
        });
});

// [GET] /users This route will return an array of all users.
server.get('/users', function(req, res) {
    const users = knex('users')
        .then(function(listOfUsers) {
            res.status(200).json([listOfUsers]);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

// [GET] /users/:id This route will return the user with the matching id.
server.get('/users/:id', function(req, res) {
    const { id } = req.params;

    const users = knex('users')
        .where('id', id)
        .then(function(userInfo) {
            res.status(200).json(userInfo);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
});

// [GET] /users/:id/posts returns all posts for the user with the specified id.
// server.get('/users/:id/posts', function(req, res) {
//     const { id } = req.params;

//     const posts = knex('posts')
//         .where('userId', id)
//         .then(function(postInfo) {

//         })
// });

const port = 3000;
server.listen(port, function () {
    console.log(`Server Listening on ${port}`);
});