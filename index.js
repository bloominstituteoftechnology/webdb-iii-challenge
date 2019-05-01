
const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js')

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// list all cohorts /GET
server.get('/api/cohorts', async (req, res) => {
  // get the cohorts from the database
  try {
    const cohorts = await db('cohorts'); // all the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET BY ID

server.get('/api/cohorts/:id', async (req, res) => {
  // get the cohorts from the database
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST
server.post('/api/cohorts', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);

    const role = await db('cohorts')
      .where({ id })
      .first();

    res.status(201).json(role);
	}catch(err) {
			res.status(500).json(err);
		};
});

// GET /api/cohorts/:id/students

server.get('/api/cohorts/:id/students', (req, res) => {
	const cohortForStudents = req.params.id;
	db.from('students')
		.where({ cohort_id: `${cohortForStudents} `})
		.then(students => {
			res.status(200).json(students);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

// update cohorts // PUT
server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const cohort = await db('cohorts')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(cohort);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

// remove cohort (inactivate the role)
server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});


//Stretch Problem


// list all students /GET
server.get('/api/students', async (req, res) => {
  // get the roles from the database
  try {
    const students = await db('students'); // all the records from the table
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET BY ID

server.get('/api/students/:id', async (req, res) => {
  // get the roles from the database
  try {
    const student = await db('students')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

//POST
server.post('/api/students', async (req, res) => {
  try {
    const [id] = await db('students').insert(req.body);

    const role = await db('students')
      .where({ id })
      .first();

    res.status(201).json(role);
	}catch(err) {
			res.status(500).json(err);
		};
});


// remove the student (inactivate the student)
server.delete('/api/students/:id', async (req, res) => {
  try {
    const count = await db('students')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});




const port = process.env.PORT || 9090;
server.listen(port, () => console.log(`\nrunning on ${port}\n`));