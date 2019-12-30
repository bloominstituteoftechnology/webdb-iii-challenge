const express = require('express');
const knex = require('../database/dbConfig');
const tag_db = require('./tagController.js');


const tagRouter = express.Router()

// Tag routes

tagRouter.post('/', (req, res) => {
  const tag = req.body;
  tag_db.addTag(tag)
    .then(tags => {
      res.status(201).json(tags);
    })
    .catch(error => {
      res.status(500).json({ error: 'Tag not found' });
    });
});

tagRouter.get('/', (req, res) => {
  tag_db.allTags()
    .then((tags) => {
      res.status(200).json(tags)
    })
    .catch((error) => {
      res.status(500).json({ message: 'Unable to retrieve tags from database.' })
    })
})

tagRouter.get('/:id', (req, res) => {
  const id = req.params.id;

  tag_db.getId(id)
    .then((tag) => {
      tag.length > 0 ? res.status(200).json(tag) : res.status(404).json({ message: `There are no tag with id # ${id} in the database.` })
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error finding the tag in the database.' });
    });
});

tagRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;

  tag_db.updateTag(id, tag)
    .then((tag) => {
      !tag ? res.status(404).json({ messsage: `Unable to update tag using id #${id}` }) :
        res.status(201).json(tag);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error updating the tag.' })
    })
})

tagRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  tag_db.deleteTag(id)
    .then((tag) => {
      !tag ? res.status(404).json({ message: `Unable to delete tag with id #${id}.` }) :
        res.status(200).json({ message: `Tag with id #${id} has been deleted from the database.` });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error deleting Tag from database.' });
    });
})

module.exports = tagRouter;