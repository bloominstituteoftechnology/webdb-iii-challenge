const express = require("express");
const users = require("../data/db.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await users("Users");
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

/*router.get("/:id", async (req, res) => {
  try {
    const user = await users
    .where('id', ID)
    .from('Users')
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: "The action with the specific ID does not exist." });
  }
});*/

module.exports = router;
