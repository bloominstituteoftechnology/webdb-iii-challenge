const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.post('/api/cohorts', (req, res) => {
	const cohort = req.body;
	db('cohorts')
		.insert(cohort)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get('/api/cohorts', (req, res) => {
	db.from('cohorts')
		.then(list => {
			res.status(200).json(list);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get('/api/cohorts/:id', (req, res) => {
	const uniqueCohort = req.params.id;
	db.from('cohorts')
		.where({ id: uniqueCohort })
		.then(cohort => {
			res.status(200).json(cohort);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.get('/api/cohorts/:id/students', (req, res) => {
	const cohortForStudents = req.params.id;
	db.from('students')
		.where({ cohort_id: '1' })
		.then(students => {
			res.status(200).json(students);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.put('/api/cohorts/:id', (req, res) => {
	const cohortToModify = req.params.id;
	db('cohorts')
		.where({ id: cohortToModify })
		.update(req.body)
		.then(numberUpdated => {
			res.status(200).json(numberUpdated);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

server.delete('/api/cohorts/:id/', (req, res) => {
	const cohortToDelete = req.params.id;
	db('cohorts')
		.where({ id: cohortToDelete })
		.del()
		.then(numDeleted => {
			res.status(200).json(numDeleted);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
