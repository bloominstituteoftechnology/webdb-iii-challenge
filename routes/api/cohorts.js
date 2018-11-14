const express = require('express');
const knex = require('knex');

const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

// GET all cohorts
router.get('/', async (req, res) => {
  try {
    const cohorts = await db('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ error: 'There was an error getting the cohorts.' });
  }
});

// GET cohort by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cohort = await db('cohorts').where({ id });
    res.status(200).json({ ...cohort[0] });
  } catch (error) {
    res.status(500).json({ error: 'There was an error getting that cohort.' });
  }
});

// GET students
router.get('/:id/students', async (req, res) => {
  const { id } = req.params;
  try {
    const students = await db
      .select('*')
      .from('cohorts')
      .where({ 'cohorts.id': id })
      .join('students', { 'cohorts.id': 'students.cohort_id' });

    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error getting that cohort student name.' });
  }
});

// POST new cohort
router.post('/', async (req, res) => {
  const newCohort = req.body;
  try {
    const id = await db.insert(newCohort).into('cohorts');
    const cohort = await db('cohorts').where({ id: id[0] });
    res.status(201).json({ ...cohort[0] });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'There was an error creating a new cohort.' });
  }
});

// PUT update cohort
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db('cohorts')
      .where({ id })
      .update(changes);
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: 'There was an error updating that cohort.' });
  }
});

// DELETE cohort
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db('cohorts')
      .where({ id })
      .del();
    res.status(200).json(count);
  } catch (error) {
    res.status(500).json({ error: 'There was an error deleting that cohort.' });
  }
});

module.exports = router;
