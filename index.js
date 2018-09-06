const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

//start up the API
server.get('/', (req,res) => {
res.send('API is Running');
});

//-----------END POINTS FOR COHORTS---------------

//POST request to add a cohort
server.post('/api/cohorts', (req, res) => {
    const cohort = req.body;
    // console.log(cohort);
    db.insert(cohort)
      .into('cohorts')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json(err));
  });

//GET all cohorts
  server.get('/api/cohorts', (req, res) => {
    db('cohorts')
      // .select('name')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => res.status(500).json(err));
  });

//DELETE a cohort
server.delete('/api/cohorts/:id', (req, res) => {
    const id = req.params.id;
    db('cohorts')
      .where('id', '=', id)
      .del()
      .then(count => {
        // count === number of records deleted
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  //GET Request for individual record 
server.get('/api/cohorts/:id', (req,res) => {
    const id = req.params.id;
    db('cohorts')
    .where('id', '=', id)
    .then(cohort => {
      if (cohort.length == 0) {
        res.status(404).json({message: "Cannot find corresponding record "})
      }
      res.status(200).json(cohort);
    })
    .catch(err => res.status(500).json({message: "There was an error looking for the specified record"}));
  })

  //PUT Request
server.put('/api/cohorts/:id', (req,res) => {
    const changes = req.body;
    const id = req.params.id;
    db('cohorts')
    .where('id', '=', id)
    .update(changes)
    .then(count => { //tells the number of records updated
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });

//-----------END POINTS FOR STUDENTS---------------

//POST request to add a student
server.post('/api/students', (req, res) => {
  const student = req.body;
  // console.log(cohort);
  db.insert(student)
    .into('students')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

//GET all students
server.get('/api/students', (req, res) => {
  db('students')
    // .select('name')
    .then(students => {
      res.status(200).json(students);
    })
    .catch(err => res.status(500).json(err));
});

//DELETE a student
server.delete('/students/:id', (req, res) => {
  const id = req.params.id;
  db('students')
    .where('id', '=', id)
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//GET Request for individual record 
server.get('/api/students/:id', (req,res) => {
  const id = req.params.id;
  db('students')
  .where('id', '=', id)
  .then(student => {
    if (student.length == 0) {
      res.status(404).json({message: "Cannot find corresponding record"})
    }
    res.status(200).json(cohort);
  })
  .catch(err => res.status(500).json({message: "There was an error looking for the specified record"}));
})

//PUT Request
server.put('/api/students/:id', (req,res) => {
  const changes = req.body;
  const id = req.params.id;
  db('students')
  .where('id', '=', id)
  .update(changes)
  .then(count => { //tells the number of records updated
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

