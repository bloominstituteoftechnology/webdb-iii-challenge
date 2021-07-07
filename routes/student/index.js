const express = require('express');
const { studentDb } = require('../../data/models/index.js');

const router = express.Router();

// get all students
router.get('/', (req, res) => {
	studentDb
		.get()
		.then(students => res.status(200).json(students))
		.catch(err => res.status(500).json({ error: `Server could not get student information: ${ err }` }));
});

// get student with given ID
router.get('/:id', (req, res) => {
	const { id } = req.params;
	studentDb
		.get(id)
		.then(student => {
			if (student.length) return res.status(200).json(student);
			return res.status(404).json({ error: `Student with ID ${ id } does not exist.` });
		})
		.catch(err => res.status(500).json({ error: `Server could not get information for student with ID ${ id }: ${ err }` }));
});

// create new student and return its ID
router.post('/', (req, res) => {
	const newStudent = req.body;
	studentDb
		.insert(newStudent)
		.then(id => res.status(201).json(id.id[0]))
		.catch(err => res.status(500).json({ error: `Server could not post student: ${ err }` }));
});

// update a student with given ID
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const updatedStudent = req.body;
	studentDb
		.update(id, updatedStudent)
		.then(updateBool => {
			if (updateBool) return res.status(200).json({ message: `Student with ID ${ id } updated successfully.` });
			return res.status(404).json({ error: `Student with ID ${ id } does not exist.` });
		})
		.catch(err => res.status(500).json({ error: `Server could not put student with ID ${ id }: ${ err }` }));
});

// delete a student with given ID
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	studentDb
		.delete(id)
		.then(deleteBool => {
			if (deleteBool) return res.status(200).json({ message: `Student with ID ${ id } successfully deleted.` });
			return res.status(404).json({ error: `Student with ID ${ id } does not exist.` });
		})
		.catch(err => res.status(500).json({ error: `Server could not delete student with ID ${ id }: ${ err }` }));
});

module.exports = router;
