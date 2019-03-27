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

module.exports = router;
