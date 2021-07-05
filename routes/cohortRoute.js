const express = require("express");
const knex = require("knex");

const router = express.Router();

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

// console.log(db("cohorts"));

// Cohort endpoints
router.get("/", (req, res) => {
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const cohortId = req.params.id;

  db("cohorts")
    .where("id", cohortId)
    .then(cohort => {
      if (cohort.length) {
        res.status(200).json(cohort);
      } else {
        res
          .status(404)
          .json({ message: `Could not find cohort with id ${cohortId}` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get any cohorts." });
    });
});

router.post("/", (req, res) => {
  const name = req.body;

  db.insert(name)
    .into("cohorts")
    .then(cohort => {
      res.status(201).json(cohort);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const updates = req.body;
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .update(updates)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cohorts")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
