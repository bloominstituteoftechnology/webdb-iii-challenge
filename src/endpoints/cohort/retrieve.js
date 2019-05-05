const express = require('express');
const cohortDb = require('../../db/cohort.js');

module.exports = {
	type: 'GET',
	url: '/:id',
	handler: (req, res) => {
		const { id } = req.params;
		cohortDb.get(id)
		.then(cohort => {
		  	if(cohort != undefined){
		  		res.status(200).json(cohort);
		  	}else{
		  		res.status(404).json({ error: "Cohort not found."});
		  	}
		})
		.catch(err => {
		  	console.log(err);
			res.status(500).json({ error: "Could not retrieve cohort." });
		});
	}
}