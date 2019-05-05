const express = require('express');
const cohortDb = require('../../db/cohort.js');

module.exports = {
	type: 'GET',
	url: 's/',
	handler: (req, res) => {
		cohortDb.get()
		  .then(cohorts => {
		  	res.status(200).json(cohorts);
		  })
		  .catch(err => {
		  	console.log(err);
			res.status(500).json({ error: "Could not retrieve cohorts." });
		  })
	}
}