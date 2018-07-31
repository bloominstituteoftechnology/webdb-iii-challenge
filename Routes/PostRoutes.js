const express = require("express");
const posts = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await posts("Posts");
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const post = req.body;
  try {
    const ids = await posts.insert(post).into("Posts");
    const id = ids[0];
    res.status(201).json({ id, ...post });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
