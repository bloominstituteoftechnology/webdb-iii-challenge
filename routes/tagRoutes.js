const express = require('express');
const db = require('../data/db');
const router = express.Router();

router.get("/", (req, res) => {
    db("Tags")
      .then(Tags => {
        res.status(200).json(Tags);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
  });

router.post("/", (req, res) => {
    const tag = req.body;
    db.insert(tag)
      .into("Tags")
      .then(ids => {
        const id = ids[0];
        res.status(200).json({ id, ...tag });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      });
  });

module.exports = router;