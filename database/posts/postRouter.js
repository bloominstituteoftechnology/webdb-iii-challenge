const express = require('express');

const db = require('./postController.js');

const postRouter = express.Router();

postRouter.post('/', function (req, res) {
  const post = req.body;
  db
    .addPost(post)
    .then(function (id) {
      res.status(201).json({ id });
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error Adding post' });
    });
});

postRouter.get('/', function (req, res) {
  db
    .getAll()
    .then(function (posts) {
      res.status(200).json(posts);
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error retrieving posts' });
    });
});

postRouter.get('/:id', function (req, res) {
  const { id } = req.params;

  db
    .getById(id)
    .then(function (posts) {
      if (posts.length > 0) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ msg: `Post with ${id} does not exist` });
      }
    })
    .catch(function (err) {
      res.status(500).json({ msg: 'Error retrieving posts' });
    });
});

postRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const post = req.body;
  db
    .update(id, post)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ msg: 'Updated Successfully' });
      } else {
        res
          .status(404)
          .json({ msg: 'This is the Phantom Zone, no posts exist here!' });
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error updating post' });
    });
});

postRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  db
    .nuke(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ msg: 'Delete Successful' });
      } else {
        res.status(404).json({ msg: 'post does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'Error nuking zoos' });
    });
});

//just need to break this off to a controller and test everything...looks good though for right now lol
postRouter.get('/:id/tags', (req, res) => {
  const { id } = req.params;
  knex('postTags').where({ postId: id })
    .join('tags', 'postTags.tagId', '=', 'tags.id')
    .select('postId', 'tag')
    .then(tags => {
      res.status(200).json(tags)
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

postRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  db
  postTagIt(id)
    .then(uptags => {
      res.status(200).json(uptags);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})
module.exports = postRouter;
