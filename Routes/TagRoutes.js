const express = require("express");
const tags = require("../data/db.js");

const router = express.Router();

const TagCheck = (req, res, next) => {
  if (!req.body.tag) {
    res.status(400).json({ error: "Please input a tag" });
  }
  if (req.body.tag.length > 16) {
    res.status(400).json({ error: "The tag length can't be more than 16" });
  }
  next();
};

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
  try {
    const count = await tags
      .from("Tags")
      .where(req.params)
      .del();
    if (count !== 0) {
      res.status(200).json(count);
    } else {
      res.status(404).json({ error: "No tag with the id exists." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", TagCheck, async (req, res) => {
  try {
    const count = await tags
      .where(req.params)
      .from("Tags")
      .update(req.body);
    if (count !== 0) {
      try {
        const updatedTag = await tags
          .select()
          .from("Tags")
          .where(req.params);
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
