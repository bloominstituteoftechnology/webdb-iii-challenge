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

// // get all students in the cohort with the given cohort ID
// router.get('/:id/students', (req, res) => {
// 	const { id } = req.params;
// 	cohortDb
// 		.getStudents(id)
// 		.then(students => {
// 			if (students.length) return res.status(200).json(students);
// 			return res.status(404).json({ error: `Either cohort with ID ${ id } does not exist or it does not have any students.` });
// 		})
// 		.catch(err => res.status(500).json({ error: `Server could not get students for cohort with ID ${ id }: ${ err }` }));
// });

// // create new cohort and return its ID
// router.post('/', (req, res) => {
// 	const newCohort = req.body;
// 	cohortDb
// 		.insert(newCohort)
// 		.then(id => res.status(201).json(id.id[0]))
// 		.catch(err => res.status(500).json({ error: `Server could not post cohort: ${ err }` }));
// });

// // update a cohort with given ID
// router.put('/:id', (req, res) => {
// 	const { id } = req.params;
// 	const updatedCohort = req.body;
// 	cohortDb
// 		.update(id, updatedCohort)
// 		.then(updateBool => {
// 			if (updateBool) return res.status(200).json({ message: `Cohort with ID ${ id } updated successfully.` });
// 			return res.status(404).json({ error: `Cohort with ID ${ id } does not exist.` });
// 		})
// 		.catch(err => res.status(500).json({ error: `Server could not put cohort with ID ${ id }: ${ err }` }));
// });

// // delete a cohort with given ID
// router.delete('/:id', (req, res) => {
// 	const { id } = req.params;
// 	cohortDb
// 		.delete(id)
// 		.then(deleteBool => {
// 			if (deleteBool) return res.status(200).json({ message: `Cohort with ID ${ id } successfully deleted.` });
// 			return res.status(404).json({ error: `Cohort with ID ${ id } does not exist.` });
// 		})
// 		.catch(err => res.status(500).json({ error: `Server could not delete cohort with ID ${ id }: ${ err }` }));
// });

module.exports = router;