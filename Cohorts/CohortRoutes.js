const express = require('express');

const courses = require('./coursesModel.js');

const router = express.Router();

// get a list of courses
router.get('/', (req, res) => {
  courses
    .find()
    .then(courses => {
      res.status(200).json(courses);
    })
    .catch(err => res.status(500).json(err));
});

// get a course by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const course = await courses.findById(id);

    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create courses
router.post('/', (req, res) => {
  const course = req.body;

  courses
    .add(course)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update courses
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  courses
    .update(id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to update' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete courses
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  courses
    .remove(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
