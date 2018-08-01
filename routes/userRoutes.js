const router = require('express')();
const db = require('../database/db');

router.get('/', (req, res) => {
  db('users')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('users')
    .where({ id })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});
router.post('/', (req, res) => {
  const user = req.body;
  if (!req.body.name)
    res.status(400).json({ error: 'All users must have a name' });

  db('users')
    .insert(user)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  if (!req.body.name)
    res.status(400).json({ error: 'All users must have a name' });

  db('users')
    .where({ id })
    .update(user)
    .then(
      count =>
        count > 0
          ? res.status(200).json({ message: 'User successfully updated' })
          : res.status(404).json({ message: 'User not found' })
    )
    .catch(err => res.status(500).json(err));
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('users')
    .where({ id })
    .del()
    .then(
      count =>
        count > 0
          ? res.status(200).json({ message: 'User successfully deleted' })
          : res.status(404).json({ message: 'User not found' })
    )
    .catch(err => res.status(500).json(err));
});

router.get('/:id/posts', (req, res) => {
  const { id } = req.params;

  db('posts')
    .where({ userId: id })
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
