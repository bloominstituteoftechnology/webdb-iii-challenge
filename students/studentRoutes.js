const express = require('express');

const studentModel = require('./studentModel.js');

const router = express.Router();

// get students
router.get('/', (req, res) => {
	studentModel
		.find()
		.then(students => {
			res.status(200).json(students);
		})
		.catch(err => res.status(500).json(err));
});

// get student by id
router.get('/:id', (req, res) => {
	const { id } = req.params;

	studentModel
		.findById(id)
		.then(student => {
			if (student) {
				res.status(200).json(student);
			} else {
				res.status(404).json({ error: 'No student by that id' });
			}
		})
		.catch(err => res.status(500).json(err));
});

// add student
router.post('/', (req, res) => {
	const student = req.body;

	studentModel
		.add(student)
		.then(id => {
			res.status(201).json(id);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// update student by id
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	studentModel
		.update(id, changes)
		.then(count => {
			if (!count || count < 1) {
				res.status(404).json({ message: 'No student by that id to update' });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

// delete student by id
router.delete('/:id', (req, res) => {
	const { id } = req.params;

	studentModel
		.remove(id)
		.then(count => {
			if (!count || count < 1) {
				res.status(404).json({ message: 'No student by that id to delete' });
			} else {
				res.status(200).json(count);
			}
		})
		.catch(err => res.status(500).json(err));
});

module.exports = router;
