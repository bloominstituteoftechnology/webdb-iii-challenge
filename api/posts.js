const express = require('express');
const server = express();

const db = require('./data/db.js');

const router = express.Router();


router.get('/posts', (req, res) => {
    db('posts')
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The posts information could not be retrieved.'})
    })
})


router.get('/posts/:id', (req, res) => {
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


router.post('/posts', (req, res) => {
    const post = req.body;
    db.insert(post).into('posts').then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...post})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


router.put('/posts/:id', (req, res) => {
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


router.delete('/posts/:id', (req, res) => {
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

module.exports = router;