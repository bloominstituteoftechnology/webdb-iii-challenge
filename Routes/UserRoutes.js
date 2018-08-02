const express = require("express");
const users = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await users.select().from("Users");
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const user = req.body;
  try {
    const ids = await users.insert(user).into("Users");
    const id = ids[0];
    res.status(201).json({ id, ...user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await users
      .select()
      .from("Users")
      .where(req.params)
      .first();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: `No user with the id exists.` });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await users
      .where({ id })
      .from("Users")
      .del();
    res.status(200).json(count);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const name = req.body;
  const { id } = req.params;
  if (!name || name.length > 128) {
    res
      .status(400)
      .json({
        errorMessage:
          "Please provide a name. *Note, names longer than 128 characters are not accepted."
      })
      .end();
  } else {
    try {
      const count = await users
        .where({ id })
        .from("Users")
        .update(name);
      try {
        const updatedUser = await users
          .select()
          .from("Users")
          .where({ id });
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(404).json({ message: "The specific user does not exist." });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;
  try {
    const userPost = await users.where("userId", id).from("Posts");
    if (userPost) {
      res.status(200).json(userPost);
    } else {
      res.status(404).json({ message: "That user has no posts" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
