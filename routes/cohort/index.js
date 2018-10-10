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

// update a cohort with given ID
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const updatedCohort = req.body;
	cohortDb
		.update(id, updatedCohort)
		.then(updateBool => {
			if (updateBool) return res.status(200).json({ message: `Cohort with ID ${ id } updated successfully.` });
			return res.status(404).json({ error: `Cohort with ID ${ id } does not exist.` });
		})
		.catch(err => res.status(500).json({ error: `Server could not put cohort with ID ${ id }: ${ err }` }));
});

// delete a cohort with given ID
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	cohortDb
		.delete(id)
		.then(deleteBool => {
			if (deleteBool) return res.status(200).json({ message: `Cohort with ID ${ id } successfully deleted.` });
			return res.status(404).json({ error: `Cohort with ID ${ id } does not exist.` });
		})
		.catch(err => res.status(500).json({ error: `Server could not delete cohort with ID ${ id }: ${ err }` }));
});

module.exports = router;
