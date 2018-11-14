const express = require('express')
const router = express.Router()
const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development)

router.get('/', async (req, res) => {
	try {
		let cohorts = await db('cohorts')
		res.status(200).json(cohorts)
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'There was an error accessing the cohorts from the database.' })
	}
})

router.get('/:id', async (req, res) => {
	const { id } = req.params
	try {
		let cohort = await db('cohorts').where('id', id)
		cohort.length !== 0 ? res.status(200).json(cohort) : res.status(404).json({ message: 'ID NOT FOUND' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'There was an error accessing that cohort from the database.' })
	}
})

router.post('/', async (req, res) => {
	const { name } = req.body
	if (!name) {
		res.status(404).json({ errorMessage: 'Please provide a cohort name.' })
	}
	try {
		let post = await db('cohorts').insert(req.body)
		res.status(201).json([ ...post, `${req.body.name} was added.` ])
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The cohort could not be posted to the database.' })
	}
})

router.get('/:id/students', async (req, res) => {
	const { id } = req.params
	try {
		const students = await db('students').where('id', id)
		id.length !== 0
			? res.status(200).json(students)
			: res.status(404).json({ message: 'ID NOT FOUND - NO STUDENTS WITH THIS COHORT ID EXIST' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The students could not be retrieved from the database.' })
	}
})

router.put('/:id', (req, res) => {
	if (!req.body.name) {
		res.status(400).json({ message: 'Please provide a cohort name.' })
	}
	db('cohorts')
		.where('id', req.params.id)
		.update(req.body)
		.then(count => {
			count !== 0 ? res.status(200).json(ids) : res.status(404).json({ errorMessage: 'ID NOT FOUND' })
		})
		.catch(e => res.status(500).json(e))
})

router.delete('/:id', async (req, res) => {
	const { id } = req.params
	try {
		let count = await db('cohorts').where('id', id).del()

		count > 0 ? res.status(200).json(count) : res.status(404).json({ message: 'ID not found' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The cohort could not be deleted.' })
	}
})

module.exports = router
