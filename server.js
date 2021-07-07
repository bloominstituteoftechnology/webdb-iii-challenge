const express = require("express");
const SERVER = express();
const PORT = process.env.PORT || 3300;
const DB = require("./data/dbConfig");

SERVER.use(express.json());

// POST COHORTS
SERVER.post("/api/cohorts", (req, res) => {
  const { name } = req.body;

  DB("cohorts")
    .insert({ name })
    .then(result => {
      if (typeof result[0] === "number") {
        res.status(201).json({ message: "Cohort Created!" });
      } else {
        res
          .status(400)
          .json({ message: "Please try again, cohort not created." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err.response });
    });
});

// GET COHORTS
SERVER.get("/api/cohorts", (req, res) => {
  DB("cohorts")
    .then(cohorts => {
      if (cohorts.length) {
        res.json({ cohorts });
      } else {
        res
          .status(400)
          .json({ message: "Cohorts currently unavailable. Try again later." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Connnection problem. try again." });
    });
});

// GET COHORT BY ID
SERVER.get("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  DB("cohorts")
    .where("id", id)
    .then(cohort => {
      if (cohort.length) {
        res.json({ cohort });
      } else {
        res.status(401).json({ message: "This cohort does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot connect to this user" });
    });
});

// GET STUDENTS IN COHORT OF ID
SERVER.get("/api/cohorts/:id/students", (req, res) => {
  const { id } = req.params;
  DB("students")
    .where("cohort_id", id)
    .then(students => {
      if (students.length) {
        res.json({ students });
      } else {
        res.status(400).json({ message: "No Students available" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.response });
    });
});

// UPDATE A COHORT BY ID
SERVER.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  const { cohort } = req.body;
  DB("cohorts")
    .where("id", id)
    .update({ ...cohort })
    .then(results => {
      if (results) {
        res.json({ results });
      } else {
        res.status(400).json({ message: "Not updated, try again." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.response });
    });
});

// DELETE A COHORT BY ID
SERVER.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
  DB("cohorts")
    .where("id", id)
    .del()
    .then(result => {
      if (result) {
        res.json({ result });
      } else {
        res
          .status(400)
          .json({ message: "The cohort was not deleted properly." });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Connection issues, please try to delete cohort again."
      });
    });
});

// POST STUDENT
SERVER.post("/students", (req, res) => {
  const { name, cohort_id } = req.body;
  const student = {
    name: name.toString().toLowerCase(),
    cohort_id: cohort_id
  };

  DB("students")
    .insert(student)
    .then(result => {
      res.status(201).json({ result });
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

// GET ALL STUDENTS
SERVER.get("/students", (req, res) => {
  DB("students")
    .then(students => {
      res.status(201).json({ students });
    })
    .catch(err => {
      res.status(500).json({ message: err });
    });
});

// GET A STUDENT BY ID
SERVER.get("/students/:id", (req, res) => {
  const { id } = req.params;

  DB("students")
    .join("cohorts", "students.cohort_id", "cohorts.id")
    .select("students.id", "students.name", "cohorts.name as cohort")
    .where("students.id", "=", id)
    .then(student => {
      res.json({ student });
    });
});

// UPDATE A STUDENT BY ID
SERVER.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const student = req.body;

  DB("students")
    .where("id", id)
    .update({ ...student })
    .then(bool => {
      if (bool) {
        DB("students")
          .where("id", id)
          .then(student => {
            res.status(201).json(student);
          })
          .catch(err => {
            res.status(500).json({ error: err });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

// DELETE A STUDENT BY ID
SERVER.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  let deletedStudent;

  DB("students")
    .where("id", id)
    .then(student => {
      deletedStudent = student;
      DB("students")
        .where("id", id)
        .del()
        .then(count => {
          res.json({ count });
        });
    });
});

SERVER.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
