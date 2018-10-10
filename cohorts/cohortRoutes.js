const express = require('express');

const cohortModel = require('./cohortModel.js');

const router = express.Router();

// get cohorts
router.get('/', (req, res) => {
	cohortModel
		.find()
		.then(cohorts => {
			res.status(200).json(cohorts);
		})
		.catch(err => res.status(500).json(err));
});

// get cohort by id
router.get('/:id', (req, res) => {
	const { id } = req.params;

	cohortModel
		.findById(id)
		.then(cohort => {
			if (cohort) {
				res.status(200).json(cohort);
			} else {
				res.status(404).json({ error: 'No cohort by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// get students by cohort id
router.get('/:id/students', (req, res) => {
	const { id } = req.params;

	cohortModel
		.findStudentsById(id)
		.then(students => {
			if (students[0]) {
				res.status(200).json(students);
			} else {
				res.status(404).json({ error: 'No students in that cohort' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// add cohort
router.post('/', (req, res) => {
	const cohort = req.body;

	cohortModel
		.add(cohort)
		.then(id => {
			res.status(201).json(id);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// update cohort by id
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	cohortModel
		.update(id, changes)
		.then(count => {
			if (!count || count < 1) {
				res.status(404).json({ message: 'No cohort by that id to update' });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

// delete cohort by id
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	cohortModel
		.remove(id)
		.then(count => {
			if (!count || count < 1) {
				res.status(404).json({ message: 'No cohort by that id to delete' });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;
