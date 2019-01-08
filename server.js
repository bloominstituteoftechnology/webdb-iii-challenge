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
});

// UPDATE A COHORT BY ID
SERVER.put("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
});

// DELETE A COHORT BY ID
SERVER.delete("/api/cohorts/:id", (req, res) => {
  const { id } = req.params;
});

SERVER.listen(PORT, () => {
  console.log(`Listening on PORT:${PORT}`);
});
