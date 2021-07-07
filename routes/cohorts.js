const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

// POST /api/cohorts
router.post('/', (req, res) => {
  const cohort = req.body;
  db.insert(cohort)
    .then(idInfo => {
      db.get(idInfo.id)
        .then(cohort => {
          res.status(201).json(idInfo);
        });
    }).catch(err => {
      res.status(500).json({ message: 'failed to insert cohort into db' });
    })
});

// GET /api/cohorts
router.get('/', (req, res) => {
  db('cohorts').then(rows => {
    res.json(rows);
  }).catch(err => {
    res.status(500).json({err: 'failed to find cohorts'});
  });
});

// GET /api/cohorts/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('cohorts').where('id', id).then(rows => {
    res.json(rows);
  }).catch(err => {
    res.status(500).json({ err: 'failed to find cohort' });
  });
});

// GET /api/cohorts/:id/students
router.get('/:id/students', (req, res) => {

});

// PUT /api/cohorts/:id
router.put('/:id', (req, res) => {
  const cohort = req.body;
  const { id } = req.params;
  db.update(id, cohort).then(count => {
    db.get(id).then(cohort => {
      res.status(201).json(project);
    });
  }).catch(err => {
    res.status(500).json({ err: 'cohort infomation could not be modified' });
  });
});

// DELETE /api/cohorts/:id
router.delete('/:id', (req, res) => {

});

module.exports = router;
