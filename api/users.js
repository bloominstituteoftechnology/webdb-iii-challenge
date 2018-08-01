const express = require('express');
const server = express();
const db = require('./data/db.js');
const router = express.Router();


router.get('/users', (req, res) => {
    db('users')
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'The users information could not be retrieved.'})
    })
})


router.get('/users/:id', (req, res) => {
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


router.get('/users/:id/posts', (req, res) => {
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


router.post('/users', (req, res) => {
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


router.put('/users/:id', (req, res) => {
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


router.delete('/users/:id', (req, res) => {
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

module.exports = router;
