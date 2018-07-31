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
    db.get(id).then(u => {
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
    const info = req.body;
    db.insert(info).into('users')
    .then(ids => {
        const id = ids[0]
        res.status(201).json({ id, ...info});
    }).catch(err => {
        res.status(500).json(err)
    })
})

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(ids => {
        if(!ids) {
            res.status(404).json({ error: 'The user with specified ID does not exist'})
        }
        res.status(200).json(ids);
    })
    .catch(err  => {
        res.status(500).json(err)
    })
})
server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.update( id, { name }).then(ids => {
        const id = ids[0]
        if(!name)  {
            res.status(400).json({ error: 'Please provide user name'})
        } else if (!ids) {
            res.status(404).json({ error: 'The user with specified ID does not exist' })
        } else {
            res.status(200).json(id, ...{ name })
        }
    })

})

// **** posts *****
server.get('/posts', (req, res) => {
    db('Posts').then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).json(err);
    })
})
server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.get(id).then(post => {
        res.status(200).json(post);
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.post('/posts', (req, res) => {
    const info = req.body;
    db.insert(info).into('posts')
    .then(ids => {
        const id = ids[0]
        res.status(201).json({ id, ...info});
    }).catch(err => {
        res.status(500).json(err)
    })
})
server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(ids => {
        if(!ids) {
            res.status(404).json({ error: 'The post with specified ID does not exist'})
        }
        res.status(200).json(ids);
    })
    .catch(err  => {
        res.status(500).json(err)
    })
})
server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { post } = req.body;
    db.update( id, { post }).then(ids => {
        const id = ids[0]
        if(!post)  {
            res.status(400).json({ error: 'Please provide post text'})
        } else if (!ids) {
            res.status(404).json({ error: 'The post with specified ID does not exist' })
        } else {
            res.status(200).json(id, ...{ post })
        }
    })

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
    db.get(id).then(tag => {
        res.status(200).json(tag);
    }).catch(err => {
        res.status(500).json(err);
    })
})

server.post('/tags', (req, res) => {
    const info = req.body;
    db.insert(info).into('tags')
    .then(ids => {
        const id = ids[0]
        res.status(201).json({ id, ...info});
    }).catch(err => {
        res.status(500).json(err)
    })
})
server.delete('/tags/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id).then(ids => {
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
    db.update( id, { tag }).then(ids => {
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