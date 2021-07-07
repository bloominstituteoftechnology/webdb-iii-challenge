
const express = require('express');
const router = express.Router();
const knex = require('knex')

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

//Create
//create a new cohort
//-------------------------------------------
router.post('', (req, res) => {
	const cohort = req.body;

	//test to make sure name field is filled out
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide name'})
	}

	db.insert(cohort).into('cohorts')
	.then(ids => {
		res.status(201).json(ids)
	})
	.catch(error => res.status(500).json(error))

})

//Read
//get all cohorts
//-------------------------------------------
router.get('', (req, res) => {
	db('cohorts')
	.then(cohorts => {
		res.status(200).json(cohorts)
	})
	.catch(error => res.status(500).json(error))
})

//get a specific cohort
router.get('/:id', (req, res) => {
	const { id } = req.params;
	db('cohorts')
	.where({id})
	.then(cohort => {
		res.status(200).json(cohort)
	})
	.catch(error => res.status(500).json(error))
})

//get all students from a cohort
router.get('/:id/students', (req, res) => {
	const { id } = req.params
	db('students')
	.where({cohort_id: id})
	.then(cohortStudents => {
		res.status(200).json(cohortStudents)
	})
	.catch(error => res.status(500).json(error))
})


//Update
//update a cohort
//-------------------------------------------
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	//test to make sure name field is filled out
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide name'})
	}

	db('cohorts')
	.where({ id: id })
	.update(changes)
	.then(cohort => {
		res.status(200).json(cohort)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

//Delete
//delete a cohort
//-------------------------------------------
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('cohorts')
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
