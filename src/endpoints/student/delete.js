const express = require('express');
const studentDb = require('../../db/student.js');
const validators = require('../../validators/student/create.js');

module.exports = {
	type: 'DELETE',
	url: '/:id',
	handler: (req, res) => {
		const { id } = req.params;
		studentDb.get(id)
		.then(student => {
		  	if (student != undefined) {
		  		studentDb.remove(id)
		  		.then(numRemoved => {
		  			if(numRemoved === 1){
						res.status(202).json({message: "Student successfully deleted."});
					}else{
						res.status(202).json({message: "Request accepted but no object deleted."});
					}
		  		})
		  		.catch(err => {
		  			res.status(500).json({ error: "The student could not be removed." });
		  		});
		  	}else{
		  		res.status(404).json({ message: "The student with the specified ID does not exist." });
		  	}
		})
		.catch(err => {
			res.status(500).json({ error: "The student information could not be retrieved." });
		})
	}
}
