const express = require('express');
const server = express();
const db = require('../data/db');

const router = express.Router();

//Post endpoints here
//GET array of posts
router.get('/', (req, res) => {
    db('posts').then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({error: 'The posts could not be retrieved'})
    });
    });
  
  //GET post by id
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
      res.status(404).json({ error: 'The post ID does not exist'})
    }
    db('posts')
    .where({id: Number(id)})
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({error: 'The post could not be retrieved'})
    });
  });
  
  //POST new post
  router.post('/', (req, res) => {
    const post = req.body;
    db
    .insert(post)
    .into('posts')
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...post })
    })
    .catch(err => {
      res.status(500).json({error: 'The post could not be created'})
    });
  });
  
  //PUT update post
  router.put('/:id', (req, res) => {
    const { post } = req.body;
    const { id } = req.params;
    if(!id) {
      res.status(404).json({ error: 'The post ID does not exist'})
    }
    db('posts')
    .where({ id: Number(id) })
    .update(post)
    .then(response => {
      res.status(201).json({ response });
    })
    .catch(err => {
      res.status(500).json({error: 'The post could not be updated'})
    });
  });
  
  //DELETE post
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if(!id) {
      res.status(404).json({ error: 'The post ID does not exist'})
    }
    db('posts')
    .where({ id: Number(id) })
    .delete()
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(500).json({error: 'The post could not be deleted'})
    });
  });

  module.exports = router;