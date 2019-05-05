const express = require('express');
const cohortDb = require('../../db/cohort.js');

module.exports = {
	type: 'DELETE',
	url: '/:id',
	handler: (req, res) => {
		cohortDb.get(req.params.id)
		.then(cohort => {
		  	if (cohort != undefined) {
		  		cohortDb.remove(req.params.id)
		  		.then(numRemoved => {
		  			if(numRemoved === 1){
						res.status(202).json({message: "Cohort successfully deleted."});
					}else{
						res.status(202).json({message: "Request accepted but no object deleted."});
					}
		  		})
		  		.catch(err => {
		  			res.status(500).json({ error: "The cohort could not be removed." });
		  		});
		  	}else{
		  		res.status(404).json({ message: "The cohort with the specified ID does not exist." });
		  	}
		})
		.catch(err => {
			res.status(500).json({ error: "The cohort information could not be retrieved." });
		})
	}
}
