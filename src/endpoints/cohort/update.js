const express = require('express');
const cohortDb = require('../../db/cohort.js');
const validators = require('../../validators/cohort/update.js');

module.exports = {
	type: 'PUT',
	url: '/:id',
	handler: (req, res) => {
		const {name} = req.body;
		const {id} = req.params;
		let modifiedCohort = {
	  		name: name,
	  	}
		const changedKeys = Object.keys(modifiedCohort);
		const validations = changedKeys.map(key => validators[key](modifiedCohort));
		Promise.all(validations).then(() => {
			cohortDb.update(id, modifiedCohort)
				.then(response => {
					if(response === null){
						res.status(404).json({message: "Cohort not found."});
					}else{
						res.status(200).json(response);
					}
				})
				.catch(err => {
					res.status(500).json({ error: "The cohort information could not be retrieved." });
				})
		}).catch(err => res.status(err.statusCode || 500).json(err.stack));
	
	}
}