const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  db("users")
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
});

userRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  db("users")
    .where("id", Number(id))
    .first()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.status(500).json(err));
});

userRouter.post("/", (req, res) => {
  const user = req.body;
  db.insert(user)
    .into("users")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...user });
    })
    .catch(err => res.status(500).json(err));
});

userRouter.put("/:id", (req, res) => {
  const user = req.body;
  const id = req.params.id;
  db("users")
    .where("id", id)
    .update(user)
    .then(ids => {
      const id = ids[0];
      res.status(200).json({ id, ...user });
    })
    .catch(err => res.status(500).json(err));
});

userRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("users")
    .where("id", id)
    .del()
    .then(ids => {
      const id = ids[0];
      res.status(200).json("USER DELETED SUCCESSFULLY");
    })
    .catch(err => res.status(500).json(err));
});

module.exports = userRouter;
