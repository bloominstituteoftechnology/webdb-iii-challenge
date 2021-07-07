const express = require('express');
const db = require('../data/index.js');
const router = express.Router();

router
	.route('/')
	.get(async (req, res) => {
		try {
			const names = await db('students');
			res.status(200).json(names)
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.post(async (req, res) => {
		const student = req.body;
		try {
			const id = await db('students').insert(student);
			res.status(201).json(id);
		} catch(err){
			console.log(err);
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})

router
	.route('/:id')
	.get(async (req, res) => {
		const { id } = req.params;
		try {
			const student = await db.select('students.id as id', 'students.name as name', 'cohorts.name as cohort')
				.from('students')
				.innerJoin('cohorts', 'students.cohort_id', 'cohorts.id')
				.where({ 'students.id': id })
			student.length > 0
			? res.status(201).json(student)
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			console.log(err)
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.delete(async (req, res) => {
		const { id } = req.params;
		try {
			const count = await db('students').where({ id: id }).del();
			count > 0
			? res.status(201).json({ message: 'Successfully deleted.' })
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})
	.put(async (req, res) => {
		const { id } = req.params;
		const student = req.body;
		try {
			const count = await db('students').where({ id: id }).update(student);
			count > 0
			? res.status(201).json({ message: 'Successfully updated.' })
			: res.status(404).json({ error: 'The specified ID could not be found.' })
		} catch(err){
			res.status(500).json({ error: 'The request could not be fulfilled.' });
		}
	})

module.exports = router;