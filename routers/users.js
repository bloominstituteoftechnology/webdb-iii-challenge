const express = require('express');
const server = express();

const db = require('../data/db');

const router = express.Router();

// User endpoints here

//GET array of users
router.get('/', (req, res) => {
    db('users').then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({error: 'The users could not be retrieved'})
    });
    });
    
    //GET user by id
    router.get('/:id', (req, res) => {
      const { id } = req.params;
      if(!id) {
        res.status(404).json({ error: 'The user ID does not exist'})
      }
      db('users')
      .where({id: Number(id)})
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({error: 'The user could not be retrieved'})
      });
    });
    
    //GET posts for user by id
    router.get('/:id/posts', (req, res) => {
      const { id } = req.params;
      if(!id) {
        res.status(404).json({ error: 'The user ID does not exist'})
      }
      db('posts')
      .join('users', 'posts.userId', 'users.id')
      .select('posts.text', 'users.name')
      .where('posts.id', id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({error: 'The posts for user could not be retrieved'})
      });
    })
    
    //POST user
    router.post('/', (req, res) => {
      const user = req.body;
      db
      .insert(user)
      .into('users')
      .then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...user })
      })
      .catch(err => {
        res.status(500).json({error: 'The user could not be created'})
      });
    });
    
    //PUT update user
    router.put('/:id', (req, res) => {
      const { user } = req.body;
      const { id } = req.params;
      if(!id) {
        res.status(404).json({ error: 'The user ID does not exist'})
      }
      db('users')
      .where({ id: Number(id) })
      .update(user)
      .then(response => {
        res.status(201).json({ response });
      })
      .catch(err => {
        res.status(500).json({error: 'The user could not be updated'})
      });
    });
    
    //DELETE user
    router.delete('/:id', (req, res) => {
      const { id } = req.params;
      if(!id) {
        res.status(404).json({ error: 'The user ID does not exist'})
      }
      db('users')
      .where({ id: Number(id) })
      .delete()
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({error: 'The user could not be deleted'})
      });
    });

    module.exports = router;