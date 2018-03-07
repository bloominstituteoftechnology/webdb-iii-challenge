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

module.exports = tagRouter;