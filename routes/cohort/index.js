const express = require('express');
const { cohortDb } = require('../../data/models/index.js');

const router = express.Router();

// get all cohorts
router.get('/', (req, res) => {
	cohortDb
		.get()
		.then(cohorts => res.status(200).json(cohorts))
		.catch(err => res.status(500).json({ error: `Server could not get cohort information: ${ err }` }));
});

// get cohort with given ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	cohortDb
		.get(id)
		.then(cohorts => {
			if (cohorts.length) return res.status(200).json(cohorts);
			return res.status(404).json({ error: `Cohort with ID ${ id } does not exist.` });
		})
		.catch(err => res.status(500).json({ error: `Server could not get information for cohort with ID ${ id }: ${ err }` }));
});

// create new cohort and return its ID
router.post('/', (req, res) => {
	const newCohort = req.body;
	cohortDb
		.insert(newCohort)
		.then(id => res.status(201).json(id.id[0]))
		.catch(err => res.status(500).json({ error: `Server could not post cohort: ${ err }` }));
});

module.exports = router;
