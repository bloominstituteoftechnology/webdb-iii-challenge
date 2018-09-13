const express = require('express')
server = express()
// cors = require('cors')
port = 8000

const helmet = require ('helmet')
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);




server.use(helmet())
server.use(express.json())

//initial connect test
server.get('/',(req,res)  => {
    res.send('API Up & Running');
});

//try to use a sql string
server.get('/api/cohorts', async (req, res, next) => {
    try {
      const cohort = await db(`SELECT * FROM cohorts`); // <=
      res.send(cohort);
    } catch (err) {
      next(err);
    }
  });

  // server.get('/api/cohorts', (req, res) => {
    
  //     db('cohorts').then(cohorts => {
  //         res.status(200).json(cohorts);
  //     }) 
    
  //    .catch (err => res.status(500).json(err))  
  // });

  server.get('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('cohorts')
      .where('id', '=', id) // or .where({ id: id })
     
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });



server.post('/api/cohorts', (req, res) => {
    const character = req.body;
  
    db.insert(character)
      .into('cohorts')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.put('/api/cohorts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('cohorts')
      .where('id', '=', id) // or .where({ id: id })
      .update(changes)
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });


  server.delete('/api/cohorts/:id', (req, res) => {
    const { id } = req.params;
  
    db('cohorts')
      .where({ id }) // or .where(id, '=', id)
      .del()
      .then(count => {
        // count === number of records deleted
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.get('/:cohort_id/students', (req,res) => {
    db('students')
    .where({ cohort_id: req.params.cohort_id })
    .then(cohorts => {
        res.status(200).json(cohorts);
    })
    .catch(err => res.status(500).json(err))
  });
  
server.get('/api/students', (req, res) => {
    
      db('students').then(students => {
          res.status(200).json(students);
      }) 
    
     .catch (err => res.status(500).json(err))  
  });

  server.get('/api/students/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('students')
      .where('id', '=', id) // or .where({ id: id })
     
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });



server.post('/api/students', (req, res) => {
    const character = req.body;
  
    db.insert(character)
      .into('students')
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.put('/api/students/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
  
    db('students')
      .where('id', '=', id) // or .where({ id: id })
      .update(changes)
      .then(count => {
        // count === number of records updated
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });


  server.delete('/api/students/:id', (req, res) => {
    const { id } = req.params;
  
    db('students')
      .where({ id }) // or .where(id, '=', id)
      .del()
      .then(count => {
        // count === number of records deleted
        res.status(200).json(count);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });


server.listen(port, () => console.log(`== Server Running on Port ${port} ==`))