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

router.get("/:id", async (req, res) => {
  try {
    const post = await posts
      .from("Posts")
      .where(req.params)
      .first();
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ error: `No post with the id exists.` });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await posts
      .from("Posts")
      .where({ id })
      .del();
    if (count) {
      res.status(200).json(count);
    } else {
      res.status(404).json({ error: "No post with the id exists." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { userId, text } = req.body;
  const { id } = req.params;
  if (!userId || !text) {
    res.status(400).json({ errorMessage: "Please provide a userId and text for the post." });
  }
  try {
    const count = await posts
      .where({ id })
      .from("Posts")
      .update(req.body);
    if (count) {
      try {
        const updatedPost = await posts
          .select()
          .from("Posts")
          .where({ id });
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(404).json({ message: "The specific user does not exist." });
      }
    } else {
      res.status(404).json({ error: "The post does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
