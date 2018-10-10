const express = require("express");
const cohorts = require("./routesModel.js");
const router = express.Router();



router.get("/", (req, res) => {
    cohorts('cohorts')
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The cohorts information could not be retreived" });
      });
  });
  
  router.get("/:id", (req, res) => {
    cohorts('cohorts')
    .where({id: req.params.id})
      .then(cohort => {
        res.status(200).json(cohort);
      })
      .catch(err => {
        console.error("error", err);
        res
          .status(500)
          .json({ error: "The cohorts information could not be retrieved" });
      });
  });
  
  router.post("/", (req, res) => {
    if (req.body.name.length < 128) {
      cohorts.insert(req.body)
      .into('cohorts')
        .then(ids => {
          res.status(200).json(ids);
        })
        .catch(err => {
          console.log("error", err);
          res
            .status(500)
            .json({ error: "The cohorts information could not be posted" });
        });
    } else {
      res.status(401).json({ error: "Must be under 128 characters." });
    }
  });
  
  router.put("/:id", (req, res) => {
      const cohort=req.body;
    
    cohorts('cohorts')
        .where({id: req.params.id})
        .update(cohort)
        .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "The cohort cannot be updated." });
      });
  });
  
  router.delete("/:id", (req, res) => {
    cohorts('cohorts')
    .where({id: req.params.id})
    .del()
      .then(cohorts => {
        res.status(200).json(cohorts);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "The cohort cannot be deleted." });
      });
  });
  
  
  module.exports = router;