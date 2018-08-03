const express = require("express");
const users = require("../data/db.js");

const router = express.Router();

const userCheck = (req, res, next) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Please fill out a name." });
  }
  if (req.body.name.length > 128) {
    res.status(400).json({ message: "The user name cannot be more than 128 characters long." });
  }
  next();
};

router.get("/", async (req, res) => {
  try {
    const list = await users.select().from("Users");
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", userCheck, async (req, res) => {
  const addedUser = req.body;
  try {
    const ids = await users.insert(addedUser).into("Users");
    res.status(201).json(ids[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  console.log("req.params is: ", req.params); // {id: 3}
  console.log("req.params.id is: ", req.params.id); // 3
  const { id } = req.params;
  console.log("id is: ", id); // 3

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
  try {
    const count = await users
      .where(req.params)
      .from("Users")
      .del();
    if (count !== 0) {
      res.status(200).json(count);
    } else {
      res.status(400).json({ error: "User couldn't be deleted." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", userCheck, async (req, res) => {
  const name = req.body;
  try {
    const count = await users
      .where(req.params)
      .from("Users")
      .update(name);
    console.log("count is: ", count);
    if (count !== 0) {
      try {
        const updatedUser = await users
          .select()
          .from("Users")
          .where(req.params);
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(404).json({ message: "The specific user does not exist." });
      }
    } else {
      res.status(400).json({ err: "That specific user couldn't be found." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id/posts", async (req, res) => {
  const { id } = req.params;
  try {
    const userPost = await users.where("userId", id).from("Posts");
    console.log("userPost is: ", userPost);
    if (userPost.length !== 0) {
      res.status(200).json(userPost);
    } else {
      res.status(404).json({ message: "That user has no posts" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;
