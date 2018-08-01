const express = require('express');
const server = express();

const db = require('../data/db');

const router = express.Router();

//Tag endpoints here
//GET array of tags
router.get('/', (req, res) => {
    db('tags')
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json({error: 'The tags could not be retrieved'})
    });
    });
  
    //GET tag by id
    router.get('/:id', (req, res) => {
      const { id } = req.params;
      if(!id) {
        res.status(404).json({ error: 'The tag ID does not exist'})
      }
      db('tags')
      .where({id: Number(id)})
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({error: 'The tag could not be retrieved'})
      });
    });
  
    //POST new tag
    router.post('/', (req, res) => {
      const { tag } = req.body;
      db('tags')
      .insert(tag)
      .then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...tag })
      })
      .catch(err => {
        res.status(500).json({error: 'The tag could not be created'})
      });
    });
  
    //PUT update tag
    router.put('/:id', (req, res) => {
      const { tag } = req.body;
      const { id } = req.params;
      if(!id) {
        res.status(404).json({ error: 'The tag ID does not exist'})
      }
      db('tags')
      .where({ id: Number(id) })
      .update(tag)
      .then(response => {
        res.status(201).json({ response });
      })
      .catch(err => {
        res.status(500).json({error: 'The tag could not be updated'})
      });
    });
  
    //DELETE tag
    router.delete('/:id', (req, res) => {
      const { id } = req.params;
      if(!id) {
        res.status(404).json({ error: 'The tag ID does not exist'})
      }
      db('tags')
      .where({ id: Number(id) })
      .delete()
      .then(response => {
        res.status(200).json(response)
      })
      .catch(err => {
        res.status(500).json({error: 'The tag could not be deleted'})
      });
    });

module.exports = router;