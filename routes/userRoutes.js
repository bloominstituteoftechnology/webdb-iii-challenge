const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get('/', (req, res) => {
    db
      .get()
      .then(users => {res.json(users)})
      .catch(error => {res.status(500).json({ error: 'The users information could not be retrieved.' })
    })
})
  
router.post('/', (req, res, next) => {
    const { name } = req.body;
    const user = { name }
    if (name.length > 128) return res.status(400).json({ error: 'Name is too long!' });
    db
        .insert(user) 
        .then(response => { 
            db
              .get()
              .then(users => {res.json(users)})
              .catch(error => {res.status(500).json({ error: 'Unable to post project information!' })})
        })
})

module.exports = router;