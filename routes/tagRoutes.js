const router = require('express')();
const db = require('../database/db');

router.get('/', (req, res) => {
  db('tags')
    .then(tags => res.status(200).json(tags))
    .catch(err => res.status(500).json(err));
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('tags')
    .where({ id })
    .then(tag => res.status(200).json(tag))
    .catch(err => res.status(500).json(err));
});
router.post('/', (req, res) => {
  if (!req.body.tag)
    res.status(400).json({ message: 'Please include a valid tag' });
  const tag = req.body;
  db('tags')
    .insert(tag)
    .then(id => res.status(200).json(id))
    .catch(err => res.status(400).json(err));
});
router.put('/:id', (req, res) => {
  if (!req.body.text)
    res.status(400).json({ message: 'Please include a valid tag' });
  const tag = req.body;
  const { id } = req.params;

  db('tags')
    .where({ id })
    .update(tag)
    .then(
      count =>
        count > 0
          ? res.status(200).json({ message: 'Tag successfully updated' })
          : res.status(404).json({ message: 'Tag not found' })
    );
});
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('tags')
    .where({ id })
    .del()
    .then(
      count =>
        count > 0
          ? res.status(200).json({ message: 'Tag successfully deleted' })
          : res.status(404).json({ message: 'Tag not found' })
    )
    .catch(err => res.status(500).json(err));
});

module.exports = router;
