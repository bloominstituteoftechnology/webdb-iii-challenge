const express = require('express');

const db = require('./tagController.js');

const tagRouter = express.Router();

tagRouter.get('/', (req, res) => {
  db
    .getTags()
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error retrieving the tags.' });
    });
});

tagRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .getTagById(id)
    .then(tags => {
      res.status(200).json(tags);
    })
    .catch(error => {
      res.status(500).json({ error: `Error retrieving tag with ID ${id}.` });
    });
});

tagRouter.post('/', (req, res) => {
  const tag = req.body;

  db
    .postTag(tag)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json({ error: 'Error posting the tag.' });
    });
});

tagRouter.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .deleteTagById(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `Tag ${id} deleted successfully.`});
      } else {
        res.status(404).json({ message: `Tag with ID ${id} not found.` });
      }
    })
    .catch(error => {
      res.status(404).json({ error: `The tag with ID ${id} does not exist.` });
    });
});

module.exports = tagRouter;