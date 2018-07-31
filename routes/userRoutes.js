const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get("/", (req, res) => {
    db
      .get()
      .then(users => {
        res.status(200).json(users);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The users information could not be retrieved." });
      });
  });
  
router.post("/", (req, res) => {
    const user = req.body;
    db
      .insert(user)
      .into("Users")
      .then(ids => {
        const id = ids[0];
        res.status(200).json({ id, ...user });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
    });
});

module.exports = router;