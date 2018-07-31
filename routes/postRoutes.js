const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get("/", (req, res) => {
    db("Posts")
      .then(Posts => {
        res.status(200).json(Posts);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
  });

router.post("/", (req, res) => {
    const post = req.body;
    db.insert(post)
      .into("Posts")
      .then(ids => {
        const id = ids[0];
        res.status(201).json({ id, ...post });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      });
  });

module.exports = router;