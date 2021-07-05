const express = require('express');
const server = express.Router();
const db = require('../data/db');

server.get("/", (req, res) => {
    db("tags")
        .then(tags => {
            res.status(200).json(tags);
        })
        .catch(err => res.status(500).json(err));
});

server.get("/:id", (req, res) => {
    const { id } = req.params;
    db("tags")
        .where({ id: Number(id) })
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

// Libby's code

server.post('/', (req, res) => {
    const  tag  = req.body;
    db('tags')
    .insert(tag)
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...tag })
    })
    .catch(err => {
      res.status(500).json({error: 'The tag could not be created'})
    });
  });

// My old code

// server.post("/", (req, res) => {
//     const tag = req.body;
//     // const { tag } = tag;
//     // Suggestions to change this ^?

//     db.insert(tag)
//         .into("tags")
//         .then(ids => {
//             const id = ids[0];
//             res.status(201).json({ id, ...tag });
//         })
//         .catch(err => {
//             res.status(500).json(err);
//         });
// });

server.delete("/:id", (req, res) => {
    const { id } = req.params;
    db("tags")
        .where({ id: Number(id) })
        .delete()
        .then(response => {
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json(err));
});

server.put("/:id", (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    if (!tag) res.status(400).json({ err });
    else {
        db("tags")
            .where({ id: Number(id) })
            .update(tag)
            .then(tag => {
                if (tag > 0) res.status(200).json(tag);
                else res.status(400).json({ err });
            })
            .catch(err => res.status(500).json(err));
    }
});

module.exports = server;