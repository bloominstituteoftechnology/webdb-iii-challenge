const express = require("express");
const students = require("./routesModel.js");
const router = express.Router();



router.get("/", (req, res) => {
    students('students')
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The students information could not be retreived" });
      });
  });
  
  router.get("/:id", (req, res) => {
    students('students')
    .where({id: req.params.id})
      .then(student => {
        res.status(200).json(student);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The students information could not be retrieved" });
      });
  });
  
  router.post("/", (req, res) => {
    if (req.body.name.length < 128) {
      students.insert(req.body)
      .into('students')
        .then(ids => {
          res.status(200).json(ids);
        })
        .catch(err => {
          console.log("error", err);
          res
            .status(500)
            .json({ error: "The students information could not be posted" });
        });
    } else {
      res.status(401).json({ error: "Must be under 128 characters." });
    }
  });
  
  router.put("/:id", (req, res) => {
      const student=req.body;
    
    students('students')
        .where({id: req.params.id})
        .update(student)
        .then(students => {
        res.status(200).json(students);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "The student cannot be updated." });
      });
  });
  
  router.delete("/:id", (req, res) => {
    students('students')
    .where({id: req.params.id})
    .del()
      .then(students => {
        res.status(200).json(students);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "The student cannot be deleted." });
      });
  });
  
  
  module.exports = router;