const express = require('express')
const router = express.Router()
const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development)

router.get('/', async (req, res) => {
	try {
		let students = await db('students')
		res.status(200).json(students)
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'There was an error accessing the students from the database.' })
	}
})

router.get('/:id', async (req, res) => {
	const { id } = req.params
	try {
		let student = await db.select('id','name').from('students').where('id', id)

		let cohort = await db.select('name').from('cohorts')

		student.length !== 0
			? res.status(200).json({...student[0], cohort: cohort[0]['name']})
			: res.status(404).json({ message: 'ID NOT FOUND' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'There was an error accessing that student from the database.' })
	}
})

router.post('/', async (req, res) => {
	const { name } = req.body
	if (!name) {
		res.status(404).json({ errorMessage: 'Please provide a student name.' })
	}
	try {
		let post = await db('students').insert(req.body)
		res.status(201).json([ ...post, `${req.body.name} was added.` ])
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The student could not be posted to the database.' })
	}
})

router.put('/:id', (req, res) => {
	if (!req.body.name) {
		res.status(400).json({ message: 'Please provide a student name.' })
	}
	db('students')
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
		let count = await db('students').where('id', id).del()

		count > 0 ? res.status(200).json(count) : res.status(404).json({ message: 'ID not found' })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: 'The student could not be deleted.' })
	}
})

module.exports = router
