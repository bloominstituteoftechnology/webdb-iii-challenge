const express = require('express');
const { cohortDb } = require('../../data/models/index.js');

const router = express.Router();

router.get('/', (req, res) => {
	cohortDb
		.get()
		.then(cohorts => res.status(200).json(cohorts))
		.catch(err => res.status(500).json({ error: `Server could not get cohort information: ${ err }` }));
});

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

module.exports = router;
