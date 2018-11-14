
const port = process.env.PORT || 3300;   // process for dynamically assign port at heroku

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const server = express();

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);



server.use(express.json()); // built in
 server.use(helmet()); // third party
 server.use(morgan('short')); // third party



 server.get("/api/cohorts", (req, res, next) => {
    db("cohorts")
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(next)
        // err => res.status(500).json({ message: "could not get cohort", err }));
  });
  
  server.get("/api/cohorts/:id", (req, res, next) => {
    const cohortId = req.params.id;
  
    db("cohorts")
      .where({ id: cohortId })
      .then(cohort => {
        if (cohort[0]) {
          res.status(200).json(cohort);
        } else {
          res.status(404).json({ message: "a cohort with that ID doesn't exist" });
        }
      })
      .catch(next);
  });
  
  server.get("/api/cohorts/:id/students", (req, res, next) => {
    const cohortId = req.params.id;
    // 'students.id', 'students.student_name',
    db("cohorts")
        .select('students.id',"students.student_name", 'cohorts.name')
       .where({' cohorts.id': cohortId })
       .join('students', {'cohorts.id' : 'students.cohort_id'})
      .then(students => {
        if (students[0]) {
          res.status(200).json(students);
        } else {
          res.status(404).json({ message: "student with that cohort ID doesn't exist" });
        }
      })
      .catch(next);
  });


  server.post("/api/cohorts", (req, res, next) => {
    const cohort = req.body;
  
    if (!cohort.name) {
      res.status(400).json({ message: "Required info is missing" });
    } else {
      db("cohorts")
        .insert(cohort)
        // .returning('id')
        .then(ids => {
          res.status(200).json(ids);
        })
        .catch(err =>
          res.status(500).json({ message: "could not add cohort", err })
        );
    }
  });
  
  server.put("/api/cohorts/:id", (req, res, next) => {
    const cohortId = req.params.id;
    const body = req.body;
  
    db("cohorts")
      .where({ id: cohortId })
      .update(body)
      .then(count => {
        if (count) res.status(200).json(count);
        else res.status(404).json({ message: "no matching id found" });
      })
      .catch(err => res.status(500).json({ message: "could not update", err }));
  });
  
  server.delete("/api/cohorts/:id", (req, res, next) => {
    const cohortId = req.params.id;
  
    db("cohorts")
      .where({ id: cohortId })
      .delete()
      .then(count => {
        res.status(200).json(count);
      })
      .catch(
           next(new error("CANT_FIND_PRO"))
        // err => res.status(500).json({ message: "could not delete", err }));
        );
  });
  
  
  




 const errorHandleFunc = (err, req, res, next) => {
    switch (err.message) {
      case 'CANT_FIND_PRO':
        res
          .status(404)
          .send({ status: 'There is no existing project by that ID' })
        break
      case 'INVALID_NAME':
        res.status(400).send({
          error: 'A name for each project is required, up to 128 characters max'
        })
        break
      default:
        res.status(500).send({ error: err.message })
        break
    }
  }
  
  server.use(errorHandleFunc);
server.listen(port, () => console.log(`\nAPI running on port ${port}\n`));