const express = require('express');
const { cohortDb } = require('../../data/models/index.js');

const router = express.Router();

router.get('/', (req, res) => {
	cohortDb
		.get()
		.then(cohorts => res.status(200).json(cohorts))
		.catch(err => res.status(500).json({ error: `Server could not get cohort information: ${ err }` }));
});

module.exports = router;
