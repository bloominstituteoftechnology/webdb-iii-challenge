const express = require('express');
const route = express.Router();

const db = require('../dataConfig')

route.post('/', (req, res) => {
    const { name } = req.body;
    db('cohorts')
      .insert({ name })
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({ message: 'you need a name', err });
      });
  });

  route.get('/', (req, res) => {
    db('cohorts')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  