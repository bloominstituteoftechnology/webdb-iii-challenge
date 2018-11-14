const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

// get all student and their cohort info
server.get('/api/cohorts/all', (req, res) => {
	db
		.select('*')
		.from('students')
		.leftJoin('cohorts', 'students.cohort_id', 'cohort.id')
		.then((data) => {
			res.status(200).json({ data });
		})
		.catch((err) => {
			res.status(500).json({ err });
		});
});

// get all cohort info
server.get('/api/cohorts', (req, res) => {
	db('cohorts')
		.then((cohorts) => {
			res.status(200).json(cohorts);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});
// get all student info
server.get('/api/students', (req, res) => {
	db('students')
		.then((students) => {
			res.status(200).json(students);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

// update/edit a cohort
server.put('/api/cohorts/:cohort_id', (req, res) => {
	const changes = req.body;
	const { cohort_id } = req.params;

	db('cohorts')
		.where({ id: cohort_id })
		.update(changes)
		.then((count) => {
			res.status(200).json({ count });
		})
		.catch((err) => res.status(500).json(err));
});

//update/edit a student
server.put('/api/cohorts/:student_id', (req, res) => {
	const changes = req.body;
	const { student_id } = req.params;
	db('cohorts')
		.where({ id: student_id })
		.update(changes)
		.then((count) => {
			res.status(200).json({ count });
		})
		.catch((err) => res.status(500).json(err));
});

// add a new cohort
server.post('/api/cohorts/create', (req, res) => {
	const cohorts = req.body;
	db('cohorts')
		.insert(cohort)
		.returning('id')
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error updating that cohort', err });
		});
});

// add a new student
server.post('/api/students/create', (req, res) => {
	const student = req.body;
	db('students')
		.insert(student)
		.returning('id')
		.then((ids) => {
			res.status(201).json(ids);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error updating that cohort', err });
		});
});

//delete a cohort
server.delete('/api/cohorts/delete/:cohort_id', (req, res) => {
	const { cohort_id } = req.params;
	db('cohort_id')
		.where({ id: cohort_id })
		.del()
		.then((count) => {
			res.status(200).json({ count });
		})
		.catch((err) => res.status(500).json(err));
});

//delete a student
server.delete('/api/students/delete/:studentid', (req, res) => {
	const { studentid } = req.params;
	db('studentid')
		.where({ id: studentid })
		.del()
		.then((count) => {
			res.status(200).json({ count });
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

server.get('/', (req, res) => {
	res.json({ api: 'up' });
});

server.listen(9000, () => console.log('\n== Port 9k ==\n'));
