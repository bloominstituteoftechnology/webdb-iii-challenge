const express = require('express');
const knex = require('../database/dbConfig');
const postTags_db = require('./postTagsController.js');

const postTagsRouter = express.Router()

// postRouter.post('/:id/tags')
  // const postId = req.params.id
  // const tagId = req.body.id;
  // const postTags = {
  //  postId: postId,
  //  tagId: tagId
  //};

postTagsRouter.post('/:id', (req, res) => {
  const postId = req.params.id
  const tagId = req.body.tagId;

  const post_tags = {
    postID: postId,
    tagId: tagId
  };

  postTags_db.addTag(post_tags)
    .then((post_tags) => {
      res.status(201).json({message: 'Tag added to post.'})
    })
    .catch((error) => {
      console.log(post_tags)
      res.status(500).json({message: 'Error adding tag to post.'})
    })
})

postTagsRouter.get('/', (req, res) => {
  postTags_db.allPostTags()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(500).json({message: 'Error retrieving the table.'})
    })
})

module.exports = postTagsRouter;