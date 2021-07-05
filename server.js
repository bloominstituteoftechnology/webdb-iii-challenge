const express = require("express");
const db = require("./data/db");
const server = express();
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Working');
});

//USERS

server.get("/Users", (req, res) => {
    db("Users")
      .then(users => {
        res.status(200).json(users);
      })
      .catch(error => {
        res.status(500).json({ error: "User info not retrieved" });
      });
});

server.get("/Users/:id", (req, res) => {
    const { id } = req.params;
    db("Users")
      .where("id", Number(id))
      .then(user => {
        if (user.length === 0) {
          res.status(404).json({ mesage: "User does not exist" });
    }
          res.status(200).json(user);
    })
       .catch(err => {
        res.status(500).json({ err: "User info not retrieved" });
      });
  });

server.get("/Users/:id/Posts", (req, res) => {
    db("Posts")
      .where("userId", req.params.id)
      .then(posts => {
        if (posts.length === 0) {
          res.status(404).json({ msg: "Post does not exist" });
        }
        res.status(200).json(posts);
    })
      .catch(err => {
        res.status(500).json({ err: "Post info not retrieved" });
    });
  });
server.post('/Users', (req, res) => {
    const user = req.body;
  
    db.insert(user)
      .into('Users')
      .then(ids => {
        res.status(201).json(ids[0]);
    })
      .catch(err => {
        res.status(500).json({ err: "Failed to post character"});
    });
  });

server.put('/Users/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db('Users')
        .where({ id: id }) // OR ( 'id','=', id )
        .update(changes)
        .then(count => { 
            //count === number of records updated
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json({ err: "Failed to modify data"});
        });
});

server.delete("/Users/:id", (req, res) => {
    const { id } = req.params;
    db("Users")
      .where("id", Number(id))
      .delete()
      .then(users => {
        if (users === 0) {
          res.status(404).json({ message: "User does not exist" });
        }
          res.status(200).json({ message: "User deleted" });
      })
       .catch(error => {
          res.status(500).json({ error: "Failed to delete user" });
      });
  });

// POSTS

server.get("/Posts", (req, res) => {
    db("Posts")
      .then(posts => {
        res.status(200).json(posts);
      })
      .catch(err => {
        res.status(500).json({ err: "Post info not retrieved" });
      });

server.get("/Posts/:id", (req, res) => {
    const { id } = req.params;
        db("Posts")
          .join("Users", "Posts.userId", "=", "Users.id")
          .select("Posts.id", "Users.name", "Posts.text", "Posts.createdAt")
          .where("Posts.id", Number(id))
          .then(post => {
            if (post.length === 0) {
              res.status(404).json({ msg: "Post does not exist" });
        }
            res.status(200).json(post);
        })
          .catch(err => {
            res.status(500).json({ err: "Post info not retrieved" });
        });
      });
server.get("/Posts/:id/Tags", (req, res) => {
    db("Tags")
          .where("postId", req.params.id)
          .then(tags => {
            if (tags.length === 0) {
              res.status(404).json({ msg: "Tag does not exist" });
        }
              res.status(200).json(tags);
        })
          .catch(err => {
              res.status(500).json({ err: "Post info not retrieved" });
        });
      });
server.post("/Posts", (req, res) => {
    const post = req.body;
        db.insert(post)
          .into("Posts")
          .then(ids => {
            const id = ids[0];
            res.status(201).json({ id, ...post });
          })
          .catch(err => {
            res.status(500).json({ err: "Failed to save post to database" });
          });
      });
server.delete("/Posts/:id", (req, res) => {
    const { id } = req.Params;
        db("Posts")
          .where("id", Number(id))
          .delete()
          .then(posts => {
            if (posts === 0) {
              res.status(404).json({ msg: "Post does not exist" });
            }
            res.status(200).json({ msg: "Post deleted" });
          })
          .catch(err => {
            res.status(500).json({ err: "Post not deleted" });
          });
      });
server.put("/Posts/:id", (req, res) => {
    const { id } = req.params;
    const text = req.body;
        if (!text) {
          res.status(400).json({ err: "Missing post body" });
        }
        db("Posts")
          .where("id", Number(id))
          .update(text)
          .then(post => {
            if (!post) {
              res.status(404).json({ err: "User does not exist" });
        }
              res.status(200).json(text);
        })
          .catch(err => {
            res
              .status(500)
              .json({ err: "Failed to modify user" });
        });
      });

// TAGS

server.get("/Tags", (req, res) => {
    db("Tags")
      .then(tags => {
        res.status(200).json(tags);
      })
      .catch(err => {
        res.status(500).json({ err: "Data not retrieved" });
      });
  });
  server.get("/Tags/:id", (req, res) => {
    const { id } = req.params;
    db("Tags")
      .where("id", Number(id))
      .then(tag => {
        if (tag.length === 0) {
          res.status(404).json({ msg: "Post does not exist" });
        }
          res.status(200).json(tag);
      })
      .catch(err => {
        res.status(500).json({ err: "Failed to retrieve info" });
      });
  });

server.post("/Tags", (req, res) => {
    const tag = req.body;
    db.insert(tag)
      .into("Tags")
      .then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...tag });
      })
      .catch(err => {
        res.status(500).json({ err: "Failure saving to database" });
      });
  });

server.delete("/Tags/:id", (req, res) => {
    const { id } = req.params;
      db("Tags")
      .where("id", Number(id))
      .delete()
      .then(tags => {
        if (tags === 0) {
          res.status(404).json({ msg: "Tag does not exist" });
        }
          res.status(200).json({ msg: "Tag deleted" });
      })
      .catch(err => {
          res.status(500).json({ err: "Tag not deleted" });
      });
  });

server.put("/Tags/:id", (req, res) => {
    const { id } = req.params;
    const tag = req.body;
    if (!tag) {
      res.status(400).json({ msg: "Post needs body" });
    }
    db("Tags")
      .where("id", Number(id))
      .update(tag)
      .then(tag => {
        if (!tag) {
          res.status(404).json({ msg: "User does not exist" });
        }
        res.status(200).json(tag);
      })
      .catch(err => {
        res.status(500).json({ err: "The user information could not be modified." });
      });
  });

  const port = 8000;
  server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
  })
});