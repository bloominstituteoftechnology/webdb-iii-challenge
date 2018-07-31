const express = require('express');

const db = require('./data/db')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('lets GO!');
})


//Create user

server.post('/api/users', (req, res, next) => {
    let user = req.body;
    db.insert(user).into('Users').then(users => {
        console.log(users);
        res.json({
            users
        });
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Get users

server.get('/api/users', (req,res, next)=> {
  db('Users').then(users=> {
      console.log(users);
      res.json({users});
  }).catch(err => {
     res.status(500).json(err)
  })
})

//Update user
server.put('/api/users/:id', (req, res, next)=> {
    let id = req.params.id;
    let name = req.body.name;
    db('users').where('id', Number(id)).update({'name':name})
    .then(response => {
        res.json({response})
    })
    .catch(err=> {
        res.json(err)
    })
});

//Delete user
server.delete('/api/users/:id', (req, res, next)=> {
    let id = req.params.id;
    db('users').where('id', Number(id)).del()
    .then(response => {
        res.json({response})
    })
    .catch(err=> {
        res.json(err)
    })
});

//Create post
server.post('/api/posts', (req, res, next) => {
    let post = req.body;
    db.insert(post).into('Posts').then(posts => {
        console.log(posts);
        res.json({
            posts
        });
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Get posts

server.get('/api/posts', (req, res, next) => {
    db('Posts').then(posts => {
        console.log(posts);
        res.json({
            posts
        });
    }).catch(err => {
        res.status(500).json(err)
    })
});

//Update post
server.put('/api/posts/:id', (req, res, next) => {
    let id = req.params.id;
    let text = req.body.text;
    db('Posts').where('id', Number(id)).update({
            'text': text
        })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(err => {
            res.json(err)
        })
});
//Delete post
server.delete('/api/posts/:id', (req, res, next) => {
    let id = req.params.id;
    db('Posts').where('id', Number(id)).del()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(err => {
            res.json(err)
        })
});

//Create tag
server.post("/api/tags", (req, res, next) => {
  let tag = req.body;
  db.insert(tag)
    .into("Tags")
    .then(tag => {
      console.log(tag);
      res.json({
        tag
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Get tags
server.get('/api/tags', (req, res, next) => {
    db('Tags').then(tags => {
        console.log(tags);
        res.json({
            tags
        });
    }).catch(err => {
        res.status(500).json(err)
    })
})

//Update Tag
server.put('/api/tags/:id', (req, res, next) => {
    let id = req.params.id;
    let tag = req.body.tag;
    db('Tags').where('id', Number(id)).update({
            'tag': tag
        })
        .then(response => {
            res.json({
                response
            })
        })
        .catch(err => {
            res.json(err)
        })
});
//Delete Tag
server.delete('/api/tags/:id', (req, res, next) => {
    let id = req.params.id;
    db('Tags').where('id', Number(id)).del()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(err => {
            res.json(err)
        })
})

const port = 8000;
server.listen(port, function () {
    console.log(`\n===Web API listening on http://localhost:${port} ===\n`)
})
