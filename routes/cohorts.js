const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const cohorts = await db('cohorts');
		res.status(200).json(cohorts);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	if (!req.body.name) {
		res.status(406).json({ message: 'Please enter a name for the new cohort' });
		return;
	}
	try {
		const [id] = await db('cohorts').insert(req.body);
		const cohort = await db('cohorts')
			.where({ id })
			.first();
		res.status(201).json(cohort);
	} catch (err) {
		const message = errors[err.errno] || 'Error posting new cohort';
		res.status(500).json({ message, err });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const cohort = await db('cohorts')
			.where({ id: req.params.id })
			.first();
		if (cohort) {
			res.status(200).json(cohort);
		} else {
			res.status(404).json({ message: 'No cohort found with that ID' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	if (!req.body.name) {
		res.status(406).json({ message: 'Please enter a name for the cohort' });
		return;
	}
	try {
		const count = await db('cohorts')
			.where({ id: req.params.id })
			.update(req.body);

		if (count > 0) {
			const cohort = await db('cohorts')
				.where({ id: req.params.id })
				.first();
			res.status(200).json(cohort);
		} else {
			res.status(404).json({ message: 'No record found with that ID' });
		}
	} catch (err) {
		res.status(500).message({ message: 'Server error updating the record' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const count = await db('cohorts')
			.where({ id: req.params.id })
			.del();
		if (count > 0) {
			res.status(204).end();
		} else {
			res.status(404).json({ message: 'No record found with that ID' });
		}
	} catch (err) {
		res.status(500).message({ message: 'Server error deleting the record' });
	}
});

router.get('/:id/students', async (req, res) => {
	try {
		const cohort = await db('cohorts')
			.where({ id: req.params.id })
			.first();
		const students = await db('cohorts')
			.join('students', {
				'cohorts.id': 'students.cohort_id',
			})
			.where({ cohort_id: cohort.id })
			.map(student => {
				return {
					id: student.id,
					name: student.name,
				};
			});
		const join = {
			id: cohort.id,
			name: cohort.name,
			students: students,
		};
		res.status(200).json(join);
	} catch (err) {
		res.status(500).json({ message: 'Server error retrieving the record' });
	}
});

module.exports = router;
