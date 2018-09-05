const express = require("express");
const studentRouter = express.Router();
const studentDB = require("../db/dbConfig");
//middleware below
const bodyChecker = require("../middleware/bodyChecker");
const cohortChecker = require("../middleware/cohortChecker");
//middleware above
studentRouter.get("/", (req, res) => {
  studentDB("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

studentRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  studentDB("students")
    .where({ id })
    .then(student => {
      res.status(200).json(student);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

studentRouter.post("/", cohortChecker, (req, res) => {
  studentDB("students")
    .insert(req.body)
    .then(studentId => {
      res.status(200).json(studentId);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

studentRouter.put("/:id", cohortChecker, (req, res) => {
  const { id } = req.params;
  studentDB("students")
    .update(req.body)
    .where({ id })
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

studentRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  studentDB("students")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = studentRouter;
