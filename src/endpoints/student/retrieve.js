const express = require('express');
const studentDb = require('../../db/student.js');
const validators = require('../../validators/student/update.js');

module.exports = {
	type: 'GET',
	url: '/:id',
	handler: (req, res) => {
		studentDb.get(req.params.id)
		  .then(student => {
		  	if(student != undefined){
		  		res.status(200).json(student);
		  	}else{
		  		res.status(404).json({ error: "Student not found."});
		  	}
		  })
		  .catch(err => {
		  	console.log(err);
			res.status(500).json({ error: "Could not retrieve student." });
		  })
	}
}