const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

// endpoints here
[POST] `/users` This route should save a new user to the database.
server.get('/', function(req, res) {
    res.status(200).json({ success: true });
});

server.get('/api/zoos, function(req, res) {
    const zoos = knex('zoos')
    .then(function(zoos) {
        res.status(200).json(zoos);
    })
    .catch(function() {
        res.status(500).json({ errorMessage: 'Could not get the Zoos' });
    });
});

server.post('api/zoos', function(req, res) {
    // new route handler
    const zoo = req.body; 

    knex
      .insert(zoo)
      .into('zoos')
      .then(function(ids) {
          res.status(201).json({ ids });
      })
}

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});

// raw connector || query builder || ORM: Object Relational Mapper
// SQL Injection

const bear = { 
    name: 'Po',
    species: 'Panda',
    latinName: 'ursus kunfusious',
    partners: [
        { name: 'asfsd', species: 'monkey' },
    ]
};




### Users
* [POST] `/users` This route should save a new user to the database.
* [GET] `/users` This route will return an array of all users.
* [GET] `/users/:id` This route will return the user with the matching `id`.
* [GET] `/users/:id/posts` returns all posts for the user with the specified `id`.
* [PUT] `/users/:id` This route will update the user with the matching `id` using information sent in the body of the request.
* [DELETE] `/users/:id` This route should delete the specified user.

### Posts
* [POST] `/posts` This route should save a new post to the database.
* [GET] `/posts` This route will return an array of all posts.
* [GET] `/posts/:id` This route will return the post with the matching `id`.
* [PUT] `/posts/:id` This route will update the post with the matching `id` using information sent in the body of the request.
* [DELETE] `/posts/:id` This route should delete the specified post.

### Tags
* [POST] `/tags` This route should save a new tag to the database.
* [GET] `/tags` This route will return an array of all tags
* [GET] `/tags/:id` This route will return the tag with the matching `id`.
* [PUT] `/tags/:id` This route will update the tag with the matching `id` using information sent in the body of the request.
* [DELETE] `/tags/:id` This route should delete the specified tag.