const express = require("express");
const tags = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await tags("Tags");
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const tag = req.body;
  try {
    const ids = await tags.insert(tag).into("Tags");
    const id = ids[0];
    res.status(201).json({ id, ...tag });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
