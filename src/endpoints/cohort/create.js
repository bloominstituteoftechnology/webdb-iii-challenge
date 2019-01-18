const express = require('express');
const cohortDb = require('../../db/cohort.js');
const validators = require('../../validators/cohort/create.js');

module.exports = {
	type: 'POST',
	url: '/',
	handler: (req, res) => {
		const {name} = req.body;
		let cohort = {
	  		name: name,
	  	}
		const newKeys = Object.keys(cohort);
		const validations = newKeys.map(key => validators[key](cohort));
		Promise.all(validations).then(() => {
			cohortDb.insert(cohort)
			  .then(id => {
			  	res.status(201).json(id);
			  })
			  .catch(err => {
				res.status(500).json({ error: "There was an error while saving the new cohort to the database." });
			  });
		}).catch(err => res.status(err.statusCode || 500).json(err.stack));
	}
}
