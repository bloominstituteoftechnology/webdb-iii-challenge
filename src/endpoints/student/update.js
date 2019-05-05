const express = require('express');
const studentDb = require('../../db/student.js');
const cohortDb = require('../../db/cohort.js');
const validators = require('../../validators/student/update.js');

module.exports = {
	type: 'PUT',
	url: '/:id',
	handler: (req, res) => {
		const {cohort_id, name} = req.body;
		const {id} = req.params;
		let modifiedStudent = {
	  		name: name,
	  		cohort_id: cohort_id
	  	}
		const changedKeys = Object.keys(modifiedStudent);
		const validations = changedKeys.map(key => validators[key](modifiedStudent));
		Promise.all(validations).then(() => {
			cohortDb.get(cohort_id)
			.then(cohort => {
				if(cohort != undefined){
					studentDb.update(id, modifiedStudent)
					.then(response => {
						if(response === undefined){
							res.status(404).json({message: "Student not found."});
						}else{
							res.status(200).json(response);
						}
					})
					.catch(err => {
						res.status(500).json({ error: "The student's information could not be retrieved." });
					});
				}else{
					res.status(400).json({ error: "Please provide valid cohort ID." });
				}
			})
			.catch(err => {
				res.status(500).json({ error: "The cohort information could not be retrieved." });
			})
		}).catch(err => res.status(err.statusCode || 500).json(err.message));
	}
}