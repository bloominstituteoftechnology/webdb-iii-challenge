const express = require('express');
const studentDb = require('../../db/student.js');

module.exports = {
	type: 'GET',
	url: 's/',
	handler: (req, res) => {
		studentDb.get()
		  .then(students => {
		  	res.status(200).json(students);
		  })
		  .catch(err => {
		  	console.log(err);
			res.status(500).json({ error: "Could not retrieve students." });
		  })
	}
}