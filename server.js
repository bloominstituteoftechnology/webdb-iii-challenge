const express = require("express");
const bodyParser = require("body-parser");

const knex = require("./database/db.js");

const server = express();

server.use(bodyParser.json());

// Endpoints
// ### Users
// * [POST] `/users` This route should save a new user to the database.
server.post("/api/users", (req, res) => {});

// * [GET] `/users` This route will return an array of all users.
server.get("/api/users", (req, res) => {});

// * [GET] `/users/:id` This route will return the user with the matching `id`.
server.get("/api/users/:id", (req, res) => {});

// * [GET] `/users/:id/posts` returns all posts for the user with the specified `id`.
server.get("/api/users/:id/posts", (req, res) => {});

// * [PUT] `/users/:id` This route will update the user with the matching `id` using information sent in the body of the request.
server.put("/api/users/:id", (req, res) => {});

// * [DELETE] `/users/:id` This route should delete the specified user.
server.delete("/api/users/:id", (req, res) => {});

// ### Posts
// * [POST] `/posts` This route should save a new post to the database.
// * [GET] `/posts` This route will return an array of all posts.
// * [GET] `/posts/:id` This route will return the post with the matching `id`.
// * [PUT] `/posts/:id` This route will update the post with the matching `id` using information sent in the body of the request.
// * [DELETE] `/posts/:id` This route should delete the specified post.

// ### Tags
// * [POST] `/tags` This route should save a new tag to the database.
// * [GET] `/tags` This route will return an array of all tags
// * [GET] `/tags/:id` This route will return the tag with the matching `id`.
// * [PUT] `/tags/:id` This route will update the tag with the matching `id` using information sent in the body of the request.
// * [DELETE] `/tags/:id` This route should delete the specified tag.

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
