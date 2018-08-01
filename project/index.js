const express = require('express');
const server = express();

const db = require("./data/db")

server.use(express.json());

const port = 8000;

//users
server.get("/users", (req, res) => {
  db.select().from('Users')
    .then(response => (res.send(response)));
});
server.get("/users/:id", (req,res) =>{
  const { id } = req.params;
  db.select().from('Users').where('id', id)
    .then(response => (res.send(response)));
});
server.get("/users/:id/posts", (req,res) => {
    const { id } = req.params;
    db.select().from('Users').where('userId', id).innerJoin('Posts', 'Users.id', 'Posts.userId')
      .then(response => (res.send(response)))
});
server.put("/users/:id", (req, res) => {
    const { id, name } = req.body;
    db.update({"name": name}).into('Users').where('id', id)
      .then(response => (res.json(response)))
});


server.listen(port, () => { console.log(`Server is running on port ${port}`)});
