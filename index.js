const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());


server.get('/', (req, res) => {
    res.send('We runnin....')
  })

//Users 
//Get
server.get('/users', (req, res) => {
    db('users')
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err))
})

//Post
server.post('/users', (req, res) => {
    const user = req.body;
    db()
    .insert(user)
    .into('users')
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

//Get By ID
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users')
    .where("id", Number(id))
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

//UpdateUser
server.put('/users/:id', (req, res) =>{
    const { id } = req.params;
    const user = req.body;
    db('users')
    .where("id", Number(id))
    .update(user)
    .into('users')
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

//Delete User
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users')
    .where("id", Number(id))
    .delete()
    .then(users => {
        if(users.length === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleting user"})
    });
})


//Get Posts for a user
// server.get('/users/:id/posts', (req, res) => {
//     db('users')
//     .get(req.params.id-1)
//     .then()
// })









//Posts
//Get
server.get('/posts', (req, res) => {
    db('posts')
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err))
})


//Post
server.post('/posts', (req, res) => {
    const post = req.body;
    db
    .insert(post)
    .into('posts')
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

//Get By ID
server.get('/posts/:id', (req, res) => {
    db('posts')
    .get(req.params.id - 1)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Delete Post
server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
    .where("id", Number(id))
    .delete()
    .then(posts => {
        if(posts.length === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleting post"})
    });
})





//Tags
//Get
server.get('/tags', (req, res) => {
    db('tags')
    .then(tag => {
        res.status(200).json(tag);
    })
    .catch(err => res.status(500).json(tag))
})


//Post
server.post('/tags', (req, res) => {
    const tag = req.body;
    db
    .insert(tag)
    .into('tags')
    .then(tag => {

        res.status(201).json(tag)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})


//Get By ID
server.get('/tags/:id', (req, res) => {
    db('tags')
    .get(req.params.id - 1)
    .then(tag => {
        res.status(200).json(tag)
    })
    .catch(err => {
        res.status(500).json(err);
      });
})

//Delete Tag
server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags')
    .where("id", Number(id))
    .delete()
    .then(tags => {
        if(tags.length === 0) {
            res.status(404).json({ message: "That ID doesn't exists"});
        }
        res.status(200).json({message: "Success in deleting"});
    })
    .catch(error => {
        res.status(500).json({ error: "Error Deleting tag"})
    });
})





const port = 8000;
server.listen(port, function() {
    console.log(`\n===Yo,your Web API Listening on http://localhost:${port} ===\n`);
});