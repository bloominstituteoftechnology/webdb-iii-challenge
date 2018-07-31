const express = require('express');
const server = express();

const db = require('./data/db.js');

server.use(express.json());

/* *************************** GET ENDPOINTS ****************************/
server.get('/users', (req, res) => {
    db('users')
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
})

server.get('/posts', (req, res) => {
    db('posts')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The posts information could not be retrieved.'})
    })
})

server.get('/tags', (req, res) => {
    db('tags')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The tags information could not be retrieved.'})
    })
})

/* *************************** GETBYID ENDPOINTS ****************************/

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
    }
    db('users')
    .where({id: Number(id)})
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'})
    })
})

server.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
    }
    db('posts')
    .where({id: Number(id)})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The post information could not be retrieved.'})
    })
})

server.get('/tags/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The tag with the specified ID does not exist.'})
    }
    db('tags')
    .where({id: Number(id)})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The tag information could not be retrieved.'})
    })
})

/* *************************** GETPOSTSBYID ENDPOINTS ****************************/

server.get('/users/:id/posts', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
    }
    db('posts as p')
    .join('users as u', 'p.userId', 'u.id')
    .select('p.text', 'u.name as postedBy')
    .where('p.id', id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The user information could not be retrieved.'})
    })
})

/* *************************** POST ENDPOINTS ****************************/

server.post('/users', (req, res) => {
    const user = req.body;
    if(user.name.length > 128) {
        res.status(400).json({error: 'Name must be less than 128 characters.'})
    }
    db('users')
    .insert(user)
    .then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...user})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.post('/posts', (req, res) => {
    const post = req.body;
    db.insert(post).into('posts').then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...post})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.post('/tags', (req, res) => {
    const tag = req.body;
    if(tag.tag.length > 16) {
        res.status(400).json({error: 'Tag must be less than 16 characters.'})
    }
    db.insert(tag).into('tags').then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...tag})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

/* *************************** PUT ENDPOINTS ****************************/

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = req.body;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
    }
    if(user.name.length > 128) {
        res.status(400).json({error: 'Name must be less than 128 characters.'})
    }
    db('users')
    .where({id: Number(id)})
    .update(user)
    .then(response => {
        res.status(201).json({response})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.put('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    if(!id){
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
    }
    db('posts')
    .where({id: Number(id)})
    .update(post)
    .then(response => {
        res.status(201).json({response})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

server.post('/tags/:id', (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    if(!id){
        res.status(404).json({error: 'The tag with the specified ID does not exist.'})
    }
    if(tag.tag.length > 16) {
        res.status(400).json({error: 'Tag must be less than 16 characters.'})
    }
    db('tags')
    .where({id: Number(id)})
    .update(tag)
    .then(response => {
        res.status(201).json({response})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

/* *************************** DELETE ENDPOINTS ****************************/

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The user with the specified ID does not exist.'})
    }
    db('users')
    .where({id: Number(id)})
    .delete()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error deleting user.'})
    })
})

server.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
    }
    db('posts')
    .where({id: Number(id)})
    .delete()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error deleting post.'})
    })
})

server.delete('/tags/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The tag with the specified ID does not exist.'})
    }
    db('tags')
    .where({id: Number(id)})
    .delete()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error deleting tag.'})
    })
})



const port = 3300;
server.listen(port, () => {console.log(`\n=== Web API listening on http:localhost:${port} ===\n`)});