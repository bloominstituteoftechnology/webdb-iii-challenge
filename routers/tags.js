const express = require("express");
const tagRouter = express.Router();

tagRouter.get("/", (req, res) => {
  db("tags")
    .then(tag => {
      res.status(200).json(tag);
    })
    .catch(err => res.status(500).json(err));
});

tagRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  db("tags")
    .where("id", Number(id))
    .then(tag => res.status(200).json(tag))
    .catch(err => res.status(500).json(err));
});

tagRouter.post("/", (req, res) => {
  const tag = req.body;
  db.insert(tag)
    .into("tags")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...tag });
    })
    .catch(err => res.status(500).json(err.message));
});

tagRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db("tags")
    .where("id", id)
    .update(changes)
    .then(ids => {
      const id = ids[0];
      res.status(200).json({ id, ...changes });
    })
    .catch(err => res.status(500).json(err));
});

tagRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("tags")
    .where("id", id)
    .del()
    .then(ids => {
      const id = ids[0];
      res.status(200).json("TAG DELETED SUCCESSFULLY");
    })
    .catch(err => res.status(500).json(err));
});

module.exports = tagRouter;
