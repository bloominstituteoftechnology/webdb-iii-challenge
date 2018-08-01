const express = require('express');
const db = require('./data/db');
const server = express();

const port = 3300;

server.use(express.json());

server.get('/', (req, res) => {
    res.send('server is running');
});

// **** users *****

server.get('/users', (req, res) => {
    db('users').then(u => {
        res.status(200).json(u);
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users').where({ id: id }).then(u => {
        res.status(200).json(u);
    }).catch(err => {
        res.status(500).json(err);
    })
})

// server.get('/users/:id/posts', (req, res) => {
//     const { id } = req.params;
//     db.someFunction(id).then(u => {
//         res.status(200).json(u);
//     }).catch(err => {
//         res.status(500).json(err);
//     })
// })

server.post('/users', (req, res) => {
    const  name = req.body;
    if(!name ){
        res.status(400).json({ error: 'Please provide user name.' })
    }
    db('users').insert(name).into('users')
    .then(ids => {
        const id = ids[0]
        res.status(201).json({ id, ...name}); // how to get createdAt in json res
    }).catch(err => {
        res.status(500).json(err)
    })
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users').where({ id: id }).delete().then(ids => {
        if(!ids) {
            res.status(404).json({ error: 'The user with specified ID does not exist'})
        }
        res.status(200).json(ids, { message: 'The user has been deleted' });
    })
    .catch(err  => {
        res.status(500).json(err)
    })
})

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const  name  = req.body;
    if(!name)  {
        res.status(400).json({ error: 'Please provide user name'})
    } 
    db('users').where({ id: id }).update(name).then(ids => {
        const id = ids[0]
       if (!ids) {
            res.status(404).json({ error: 'The user with specified ID does not exist' })
        } else {
            res.status(200).json(id)
        }
    })
    .catch(err => {
        res.status(500).json(err);
      });

})

// **** posts *****
server.get('/posts', (req, res) => {
    db('posts').then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts').where({ id: id }).then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.post('/posts', (req, res) => {
    const info = req.body;
    db('posts').insert(info).into('posts')
    .then(ids => {
        const id = ids[0]
        res.status(201).json({ id, ...info});
    }).catch(err => {
        res.status(500).json(err)
    })
})

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db('posts').where({ id: id }).delete(id).then(ids => {
        if(!ids) {
            res.status(404).json({ error: 'The post with specified ID does not exist'})
        }
        res.status(200).json(ids);
    })
    .catch(err  => {
        res.status(500).json(err)
    })
})

server.put('/posts/:id', (req, res) => { // needs work with proper errors return
    const { id } = req.params;
    const  post  = req.body;
    if(!post)  {
        res.status(400).json({ error: 'Please provide post text'})
    } 
    db('posts').where({ id }).update(post).then(ids => {
        const id = ids[0]
       if (!ids) {
            res.status(404).json({ error: 'The post with specified ID does not exist' })
        } else {
            res.status(200).json(id, ...post)
        }
    })
    .catch(error => {
        res.status(500).json({error: "Didnt work"})
    });

})

// **** tags ****
server.get('/tags', (req, res) => {
    db('tags').then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        res.status(500).json(err);
    })
})
server.get('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags').get(id).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.post('/tags', (req, res) => {
    const info = req.body;
    db('tags').insert(info).into('tags')
    .then(ids => {
        // const id = ids[0]
        // res.status(201).json({ id, ...info});
        res.status(201).json(ids);
    }).catch(err => {
        res.status(500).json(err)
    })
})
server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    db('tags').remove(id).then(ids => {
        if(!ids) {
            res.status(404).json({ error: 'The tag with specified ID does not exist'})
        }
        res.status(200).json(ids);
    })
    .catch(err  => {
        res.status(500).json(err)
    })
})
server.put('/tags/:id', (req, res) => {
    const { id } = req.params;
    const { tag } = req.body;
    db('tags').update( id, { tag }).then(ids => {
        const id = ids[0]
        if(!tag)  {
            res.status(400).json({ error: 'Please provide tag text'})
        } else if (!ids) {
            res.status(404).json({ error: 'The tag with specified ID does not exist' })
        } else {
            res.status(200).json(id, ...{ tag })
        }
    })

})

server.listen(port, () => { console.log(`Server is listening on port ${port}`)})