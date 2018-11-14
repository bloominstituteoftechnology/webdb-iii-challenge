// NODE MODULES, EXPRESS ROUTER
// ==============================================
const express = require('express');
const cohortDb = require('../data/helpers/cohortDb.js');

const router = express.Router();

// ROUTES
// ==============================================
router.get('/', async (_, res) => {
  try {
    const cohorts = await cohortDb.get();
    res.status(200).json(cohorts);
  } catch {
    res.status(500).json({ error: 'There was an error retrieving all cohorts!' });
  }
});

module.exports = router;
