const express = require("express");
const postRouter = express.Router();

postRouter.get("/", (req, res) => {
  db("posts")
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err));
});

postRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  db("posts")
    .where("id", Number(id))
    .first()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => res.status(500).json(err));
});

postRouter.post("/", (req, res) => {
  const post = req.body;
  db.insert(post)
    .into("posts")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...post });
    })
    .catch(err => res.status(500).json(err));
});

postRouter.put("/:id", (req, res) => {
  const post = req.body;
  const id = req.params.id;
  db("posts")
    .where("id", id)
    .update(post)
    .then(ids => {
      const id = ids[0];
      res.status(200).json({ id, ...post });
    })
    .catch(err => res.status(500).json(err));
});

postRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("posts")
    .where("id", id)
    .del()
    .then(ids => {
      const id = ids[0];
      res.status(200).json("POST DELETED SUCCESSFULLY");
    })
    .catch(err => res.status(500).json(err));
});

module.exports = postRouter;
