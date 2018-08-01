const express = require('express');
const db = require('./../data/db.js');

const router = express.Router();

const getPostTags = function(postId) {
    return db('tags as t')
    .join('posttags as pt', 't.id', 'pt.tagId')
    .select('t.tag')
    .where('pt.postId', postId);
}

const getUserNames = function(userId) {
    db('posts as p')
    .join('users as u', 'p.userId', 'u.id')
    .select('p.text', 'u.name as postedBy')
    .where('p.id', id)
}

router.get('/', (req, res) => {
    const posts = db('posts');
    posts.map(post => {
        return getUserNames(post.id)
    })
    
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The posts information could not be retrieved.'})
    })
})


router.get('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
        return;
    }
    db('posts as p')
    .where({id: Number(id)})
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({error: 'The post information could not be retrieved.'})
    })
})

router.get('/:id/tags', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
    }
    getPostTags(id)
    
    .then(tags => {
        tags.map(t => t.tag)
        res.status(200).json(tags);
    })
    .catch(err => {
        res.status(500).json({error: 'The post tags could not be retrieved.'})
    })
})


router.post('/', (req, res) => {
    const post = req.body;
    db.insert(post).into('posts').then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...post})
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


router.put('/:id', (req, res) => {
    const id = req.params.id;
    const post = req.body;
    if(!id){
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
        return;
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


router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.status(404).json({error: 'The post with the specified ID does not exist.'})
        return;
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