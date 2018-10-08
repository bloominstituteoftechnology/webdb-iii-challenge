
const express = require('express');
const router = express.Router();
const knex = require('knex')

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

//Create
//create a new student
//-------------------------------------------
router.post('', (req, res) => {
	const student = req.body;

	//test to make sure name field is filled out
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide name'})
	}

	db.insert(student).into('students')
	.then(ids => {
		res.status(201).json(ids)
	})
	.catch(error => res.status(500).json(error))

})

//Read
//get all students
//-------------------------------------------
router.get('', (req, res) => {
	db('students')
	.then(students => {
		res.status(200).json(students)
	})
	.catch(error => res.status(500).json(error))
})

//get a specific student
router.get('/:id', (req, res) => {

	const { id } = req.params;

	db('students')
	//first I look up the student so that I can get there cohort id
	.where({id})
	.then(student => {
		const lookup = student[0].cohort_id

	// now that I have the cohort id,
	// I use it to get the name of the cohort
	db('cohorts')
	.where({id: lookup})
	.then(response => {
		const cohortName = (response[0].name)

			// I then build my response object and pass in the fields I want
			db('students')
			.where({id})
			.then(student => {
				res.status(200).json({id: student[0].id, name: student[0].name, cohort: cohortName })
			})
		})

	})
	.catch(error => res.status(500).json(error))
})


//Update
//update a student
//-------------------------------------------
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	//test to make sure name field is filled out
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide name'})
	}

	db('students')
	.where({ id: id })
	.update(changes)
	.then(student => {
		res.status(200).json(student)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

//Delete
//delete a student
//-------------------------------------------
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('students')
	.where({id: id})
	.del()
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

module.exports = router;

