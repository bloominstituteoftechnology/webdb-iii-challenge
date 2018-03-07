const express = require('express');
const db = require('./tagController.js');

const tagRouter = express.Router();

tagRouter.get('/', (req, res) => {
  db
    .getAll()
    .then(tags => {
      res.status(200).send(tags);
    }).catch(err => {
      res.status(500).send({ msg: 'Error retrieving tags.' });
    })
})

module.exports = tagRouter;