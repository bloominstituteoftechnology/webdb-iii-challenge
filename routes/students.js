const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const students = await db('students');
		res.status(200).json(students);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/', async (req, res) => {
	if (!req.body.name) {
		res
			.status(406)
			.json({ message: 'Please enter a name for the new student' });
		return;
	} else if (!req.body.cohort_id) {
		res
			.status(406)
			.json({ message: 'Please enter a cohort ID for the new student' });
	}
	try {
		const [id] = await db('students').insert(req.body);
		const student = await db('students')
			.where({ id })
			.first();
		res.status(201).json(student);
	} catch (err) {
		const message = 'Error posting new student';
		res.status(500).json({ message, err });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const student = await db
			.select('students.id', 'students.name', 'cohorts.name as cohort')
			.from('students')
			.join('cohorts', 'students.cohort_id', 'cohorts.id')
			.where('students.id', req.params.id);
		res.status(200).json(student);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put('/:id', async (req, res) => {
	if (!req.body.name) {
		res.status(406).json({ message: 'Please enter a name for the student' });
		return;
	}
	try {
		const count = await db('students')
			.where({ id: req.params.id })
			.update(req.body);

		if (count > 0) {
			const student = await db('students')
				.where({ id: req.params.id })
				.first();
			res.status(200).json(student);
		} else {
			res.status(404).json({ message: 'No record found with that ID' });
		}
	} catch (err) {
		res.status(500).message({ message: 'Server error updating the record' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const count = await db('students')
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

module.exports = router;
