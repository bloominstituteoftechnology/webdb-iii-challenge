const express = require('express');

const db = require('./tagController');

const tagRouter = express.Router();

tagRouter.post('/', function (req, res) {
  const tag = req.body;
  db
    .addtag(tag)
    .then(function (id) {
      res.status(201).json({ id });
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error Adding tag' });
    });
});

tagRouter.get('/', function (req, res) {
  db
    .getAll()
    .then(function (tags) {
      res.status(200).json(tags);
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error retrieving tags' });
    });
});

tagRouter.get('/:id', function (req, res) {
  const { id } = req.params;

  db
    .getById(id)
    .then(function (tags) {
      if (tags.length > 0) {
        res.status(200).json(tags);
      } else {
        res.status(404).json({ msg: `tag with ${id} does not exist` });
      }
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error retrieving tags' });
    });
});

tagRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const tag = req.body;
  db
    .update(id, tag)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ msg: 'Updated Successfully' })
      } else {
        res.status(404).json({ msg: 'This is the Phantom Zone, no tags exist here!' })
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error updating tag' })
    })
});

tagRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .nuke(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ msg: 'Delete Successful' })
      } else {
        res.status(404).json({ msg: 'tag does not exist' })
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error nuking zoos' })
    })
})

module.exports = tagRouter;