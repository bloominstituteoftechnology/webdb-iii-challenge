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

router.get("/:id", async (req, res) => {
  try {
    const tag = await tags
      .from("Tags")
      .where(req.params)
      .first();
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ error: `No tag with the id exists.` });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await tags
      .from("Tags")
      .where({ id })
      .del();
    if (count) {
      res.status(200).json(count);
    } else {
      res.status(404).json({ error: "No tag with the id exists." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { tag } = req.body;
  const { id } = req.params;
  if (!tag) {
    res.status(400).json({ errorMessage: "Please provide a tag." });
  }
  try {
    const count = await tags
      .where({ id })
      .from("Tags")
      .update(req.body);
    if (count) {
      try {
        const updatedTag = await tags
          .select()
          .from("Tags")
          .where({ id });
        res.status(200).json(updatedTag);
      } catch (err) {
        res.status(404).json({ message: "The specific user does not exist." });
      }
    } else {
      res.status(404).json({ error: "The tag does not exist" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
