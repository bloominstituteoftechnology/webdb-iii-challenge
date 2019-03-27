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

module.exports = router;
