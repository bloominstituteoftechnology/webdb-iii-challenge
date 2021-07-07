const express = require('express');
const db = require('../data/index.js');
const router = express.Router();

router
	.route('/')
	.get(async (req, res) => {
		try {
			const names = await db('cohorts');
			res.status(200).json(names)
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.post(async (req, res) => {
		const cohort = req.body;
		try {
			const id = await db('cohorts').insert(cohort);
			res.status(201).json(id);
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})

router
	.route('/:id')
	.get(async (req, res) => {
		const { id } = req.params;
		try {
			const cohort = await db('cohorts').where({ id: id });
			cohort.length > 0
			? res.status(201).json(cohort)
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.delete(async (req, res) => {
		const { id } = req.params;
		try {
			const count = await db('cohorts').where({ id: id }).del();
			count > 0
			? res.status(201).json({ message: 'Successfully deleted.' })
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.put(async (req, res) => {
		const { id } = req.params;
		const cohort = req.body;
		try {
			const count = await db('cohorts').where({ id: id }).update(cohort);
			count > 0
			? res.status(201).json({ message: 'Successfully updated.' })
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})

	router
		.route('/:id/students')
		.get(async (req, res) => {
			const { id } = req.params;
			try {
				const students = await db('students').where({ cohort_id: id });
				res.status(200).json(students);
			} catch(err){
				res.status(500).json({ error: 'The request could not be fulfilled.' });
			}
		})

module.exports = router;