const express = require('express');
const knex = require('knex');

const knexConfig = require('../../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cohorts = await db.select().table('cohorts');
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ error: 'There was an error getting the cohorts.' });
  }
});

module.exports = router;
