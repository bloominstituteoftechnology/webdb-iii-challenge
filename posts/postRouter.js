const express = require('express');
const knex = require('../database/dbConfig');
const post_db = require('./postController.js');

const postRouter = express.Router()

// Posts routes
postRouter.post('/', (req, res) => {
  const post = req.body;

  post_db.addPost(post)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch((error) => {
      res.status(500).json({message: 'cannot add post to database.'})
    })
})

postRouter.get('/', (req, res) => {
  post_db.allPosts()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(500).json({ message: 'Unable to retrieve posts from database.'})
    })
})

postRouter.get('/:id', (req, res) => {
  const id = req.params.id;

  post_db.getID(id)
    .then((post) => {
      post.length > 0 ? res.status(200).json(post) : res.status(404).json({message: `There are no post with id # ${id} in the database.`})
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error finding the post in the database.' });
    });
});

postRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;

  post_db.updatePost(id, post)
    .then((post) => {
      !post ? res.status(404).json({ messsage: `Unable to update post using id #${id}` }) :
              res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error updating the post.'})
    })
})

postRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  post_db.deletePost(id)
    .then((post) => {
      !post ? res.status(404).json({ message: `Unable to delete post with id #${id}.` }) :
              res.status(200).json({ message: `Post with id #${post} has been deleted from the database.`});
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error deleting Post from database.' });
    });
})

module.exports = postRouter;