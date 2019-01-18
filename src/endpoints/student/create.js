const express = require('express');
const studentDb = require('../../db/student.js');
const cohortDb = require('../../db/cohort.js');
const validators = require('../../validators/student/create.js');

module.exports = {
	type: 'POST',
	url: '/',
	handler: (req, res) => {
		console.log(req.body);
		const {cohort_id, name} = req.body;
		let newStudent = {
	  		cohort_id: cohort_id,
	  		name: name,
	  	}
	  	console.log(newStudent);
		const newKeys = Object.keys(newStudent);
		console.log(newKeys);
		const validations = newKeys.map(key => validators[key](newStudent));
		Promise.all(validations).then(() => {
			cohortDb.get(cohort_id)
			.then(cohort => {
				if(cohort != undefined){
					studentDb.insert(newStudent)
					  .then(id => {
					  	res.status(201).json(id);
					  })
					  .catch(err => {
						res.status(500).json({ error: "There was an error while saving the student to the database." });
					  });
				}else{
					res.status(400).json({ error: "Please provide valid cohort ID." });
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({ error: "The cohort information could not be retrieved." });
			})
		}).catch(err => {
			res.status(err.statusCode || 500).json(err.message);
		});
	}
}
