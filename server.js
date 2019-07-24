const express = require("express");

const bodyParser = require("body-parser");

const sqlite = require("sqlite3");
const knex = require("./db.js");

const server = express();

server.use(bodyParser.json());

// routes

server.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

// Users
server.post("/users", (req, res) => {
  const user = req.body;
  knex
    .insert(user)
    .into("users")
    .then(id => res.status(200).json({ id }))
    .catch(() => res.status(500).json({ err: "Could not insert user" }));
});

server.get("/users", (req, res) => {
  knex("users")
    .then(users => res.status(200).json({ users }))
    .catch(() => res.status(500).json({ err: "Could not get users" }));
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  knex("users")
    .where("id", id)
    .then(user => res.status(200).json({ user }))
    .catch(() => res.status(500).json({ err: "Could not find user" }));
});

server.get("/users/:id/posts", async (req, res) => {
  const id = req.params.id;
  try {
    const users = await knex("users")
      .where("id", id)
      .limit(1);
    const user = users[0];
    const posts = await knex("posts").where("userId", user.id);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});

server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const userUpdates = req.body;
  knex("users")
    .where("id", id)
    .update(userUpdates)
    .then(success => {
      if (!success) throw new Error();
      res.status(200).json({ success });
    })
    .catch(err => res.status(500).json({err: 'Could not update user'}));
});

server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  knex("users")
    .where("id", id)
    .delete()
    .then(success => {
      if (!success) throw new Error();
      res.status(200).json({ success });
    })
    .catch(err => res.status(500).json({ err: "Could not delete user" }));
});

// Posts
server.post("/posts", (req, res) => {
  const post = req.body;
  knex
    .insert(post)
    .into("posts")
    .then(post => res.status(200).json({ post }))
    .catch(err => res.status(500).json({ err: "Could not add post" }));
});

server.get("/posts", (req, res) => {
  knex("posts")
    .then(id => res.status(201).json({ id }))
    .catch(err => res.status(500).json({ err: "Could not get posts" }));
});
// Extra credit modified
server.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await knex('posts').where('id', id).limit(1);
    const post = posts[0];
    const users = await knex('users').where('id', post.userId).limit(1);
    const user = users[0];
    const tagIds = await knex('tagspost').where('postId', post.id);
    const tags = await Promise.all(
      tagIds.map(tag => knex('tags').where('id', tag.id))
    );
    post.username = user.name;
    post.tags = tags;
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({err: 'Could not get post'});
  }
});

server.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const postUpdates = req.body;
  knex("posts")
    .where("id", id)
    .update(postUpdates)
    .then(success => {
      if (!success) throw new Error();
      res.status(200).json({ success });
    })
    .catch(err => console.log(err));
});

server.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  knex("posts")
    .where("id", id)
    .delete()
    .limit(1)
    .then(success => {
      if (!success) throw new Error();
      res.status(200).json({ success });
    })
    .catch(err => res.status(500).json({ err: "Could not delete post" }));
});

// Tags
server.post("/tags", (req, res) => {
  const tag = req.body;
  knex
    .insert(tag)
    .into("tags")
    .then(post => res.status(200).json({ tag }))
    .catch(err => res.status(500).json({ err: "Could not insert tags" }));
});

server.get("/tags", (req, res) => {
  knex("tags")
    .then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json({ err: "Could not get tags" }));
});

server.get("/tags/:id", (req, res) => {
  knex("tags")
    .where("id", id)
    .limit(1)
    .then(tag => res.status(200).json({ tag }))
    .catch(err => res.status(500).json({ err: "Could not find tag" }));
});

server.put("/tags/:id", (req, res) => {
  const id = req.params.id;
  const tagUpdates = req.body;
  knex("tags")
    .where("id", id)
    .update(tagUpdates)
    .then(success => {
      if (!success) throw new Error();
      res.status(200).json({ success });
    })
    .catch(err => console.log(err));
});

server.delete("/tags/:id", (req, res) => {
  const id = req.params.id;
  knex("tags")
    .where("id", id)
    .delete()
    .limit(1)
    .then(success => {
      if (!success) throw new Error();
      res.status(200).json({ success });
    })
    .catch(err => res.status(500).json({ err: "Could not delete tag" }));
});

// Route to add a tag to a post
server.post("/posts/:postId/addTag/:tagId", (req, res) => {
  const { postId, tagId } = req.params;
  knex("tagspost")
    .insert({ postId, tagId })
    .then(id => {
      if (!id) throw new Error();
      res.status(201).json(success);
    })
    .catch(err => res.status(500).json({ err: "Could not add tag to post" }));
});

// Extra credit routes
server.get("/posts/:id/tags", (req, res) => {
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
});
