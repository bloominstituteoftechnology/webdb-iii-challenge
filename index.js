const express = require('express');
const knex = require('knex');

const dbConfig = require('./knexfile.js');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());

// //get test
server.get('/', (req, res) => {
    res.send('api is a go');
});

//[POST] /api/cohorts This route should save a new cohort to the database.
server.post('/api/cohorts', async (req, res) => {
    try {
      const [id] = await db('cohort').insert(req.body);
  
      const cohort = await db('cohort')
        .where({ id })
        .first();
  
      res.status(201).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// //[GET] /api/cohorts This route will return an array of all cohorts.
server.get('/api/cohorts', async (req, res) => {
    // get the cohorts from the database
    try {
      const cohorts = await db('cohort'); // all the records from the table
      res.status(200).json(cohorts);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// //[GET] /api/cohorts/:id This route will return the cohort with the matching id.
server.get('/api/cohorts/:id', async (req, res) => {
    // get the roles from the database
    try {
      const cohort = await db('cohort')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(cohort);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// //[GET] /api/cohorts/:id/students returns all students for the cohort with the specified id
server.get('/api/cohorts/:id/students', async (req, res) => {
    // get the roles from the database
    try {
      const students = await db('students')
        .where({ cohort_id: req.params.id })
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  });

// //[PUT] /api/cohorts/:id This route will update the cohort with the matching id using information sent in the body of the request.
server.put('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohort')
        .where({ id: req.params.id })
        .update(req.body);
  
      if (count > 0) {
        const cohort = await db('cohort')
          .where({ id: req.params.id })
          .first();
  
        res.status(200).json(cohort);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });

// //[DELETE] /api/cohorts/:id This route should delete the specified cohort.
server.delete('/api/cohorts/:id', async (req, res) => {
    try {
      const count = await db('cohort')
        .where({ id: req.params.id })
        .del();
  
      if (count > 0) {
        res.status(204).json(count);
      } else {
        res.status(404).json({ message: 'Records not found' });
      }
    } catch (error) {}
  });


  //STRETCH

  //STUDENTS
    //[POST] /students This route should save a new student to the database.
    server.post('/api/students', async (req, res) => {
        try {
          const [id] = await db('students').insert(req.body);
      
          const students = await db('students')
            .where({ id })
            .first();
      
          res.status(201).json(students);
        } catch (error) {
          res.status(500).json(error);
        }
      });

    //[GET] /students This route will return an array of all students.
    server.get('/api/students', async (req, res) => {
        // get the cohorts from the database
        try {
          const students = await db('students'); // all the records from the table
          res.status(200).json(students);
        } catch (error) {
          res.status(500).json(error);
        }
      });

    //[GET] /students/:id This route will return the student with the matching id.
    server.get('/api/students/:id', async (req, res) => {
        // get the roles from the database
        try {
          const students = await db('students')
            .where({ id: req.params.id })
            .first();
          res.status(200).json(students);
        } catch (error) {
          res.status(500).json(error);
        }
      });
    //[PUT] /students/:id This route will update the student with the matching id using information sent in the body of the request.
    server.put('/api/students/:id', async (req, res) => {
        try {
          const count = await db('students')
            .where({ id: req.params.id })
            .update(req.body);
      
          if (count > 0) {
            const students = await db('students')
              .where({ id: req.params.id })
              .first();
      
            res.status(200).json(students);
          } else {
            res.status(404).json({ message: 'Records not found' });
          }
        } catch (error) {}
      });

    //[DELETE] /students/:id This route should delete the specified student.
    server.delete('/api/students/:id', async (req, res) => {
        try {
          const count = await db('students')
            .where({ id: req.params.id })
            .del();
      
          if (count > 0) {
            res.status(204).json(count);
          } else {
            res.status(404).json({ message: 'Records not found' });
          }
        } catch (error) {}
      });

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});