const router = require('express')();
const db = require('../database/db');

router.get('/', (req, res) => {
  db('posts')
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => res.status(500).json(err));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  var post = {};
  db('posts')
    .where({ id })
    .then(found => {
      post.id = found[0].id;
      post.text = found[0].text;
      post.createAd = found[0].createdAt;
      console.log(post);
      db('users')
        .where({ id: found[0].userId })
        .then(user => {
          console.log(user);
          post.userName = user[0].name;
          res.status(200).json(post);
        })
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(500).json(err));
});
router.post('/', (req, res) => {
  if (!req.body.text)
    res.status(400).json({ message: 'Every post needs content' });
  const post = req.body;

  db('posts')
    .insert(post)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => res.status(500).json(err));
});
router.put('/:id', (req, res) => {
  if (!req.body.text)
    res.status(400).json({ message: 'Every post needs content' });
  const post = req.body;
  const { id } = req.params;

  db('posts')
    .where({ id })
    .update(post)
    .then(
      count =>
        count > 0
          ? res.status(200).json({ message: 'Post successfully updated' })
          : res.status(404).json({ message: 'Post not found' })
    )
    .catch(err => res.status(500).json(err));
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('posts')
    .where({ id })
    .del()
    .then(
      count =>
        count > 0
          ? res.status(200).json({ message: 'Post successfully deleted' })
          : res.status(404).json({ message: 'Post not found' })
    )
    .catch(err => res.status(500).json(err));
});

router.get('/:id/tags', (req, res) => {
  const { id } = req.params;

  db('tags')
    .where({ postId: id })
    .then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
